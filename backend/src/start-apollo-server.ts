import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { execute, subscribe } from "graphql"
import http from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { schema } from "./schema"

export async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "/subscriptions",
    }
  )
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
