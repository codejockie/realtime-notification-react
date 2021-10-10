import { makeExecutableSchema } from "@graphql-tools/schema"
import { IResolvers } from "@graphql-tools/utils"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { DocumentNode, execute, subscribe } from "graphql"
import http from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"

export async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: IResolvers
) {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  )

  await server.start()
  server.applyMiddleware({
    app,
    cors: {
      origin: "*",
    },
    path: "/graphql",
  })

  await new Promise((resolve) =>
    httpServer.listen({ port: 5000 }, resolve as any)
  )
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}
