import { gql } from "apollo-server-core"
import { PubSub } from "graphql-subscriptions"
import { startApolloServer } from "./start-apollo-server"

const pubsub = new PubSub()
const notifications: any[] = []
const NOTIFICATION_SUBSCRIPTION_TOPIC = "newNotifications"
const typeDefs = gql`
  type Notification {
    label: String
  }

  type Query {
    notifications: [Notification]
  }

  type Mutation {
    pushNotification(label: String!): Notification
  }

  type Subscription {
    newNotification: Notification
  }
`
type NotificationArgs = {
  label: string
}

const resolvers = {
  Query: { notifications: () => notifications },
  Mutation: {
    pushNotification: (root: any, args: NotificationArgs) => {
      const newNotification = { label: args.label }
      notifications.push(newNotification)

      pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { newNotification })
      return newNotification
    },
  },
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC),
    },
  },
}
// const schema = makeExecutableSchema({ typeDefs, resolvers })

// const app = express()
// const server = new ApolloServer({
//   schema,
//   validationRules: [depthLimit(7)],
// })

// server.applyMiddleware({ app, path: "/graphql" })

startApolloServer(typeDefs, resolvers)
