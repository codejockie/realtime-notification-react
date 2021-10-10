import { IResolvers } from "@graphql-tools/utils"
import { PubSub } from "graphql-subscriptions"

type NotificationArgs = {
  label: string
}

const pubsub = new PubSub()
const notifications: any[] = []
const NOTIFICATION_SUBSCRIPTION_TOPIC = "newNotifications"

export const resolvers: IResolvers = {
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
