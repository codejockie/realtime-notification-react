import { IResolvers } from "@graphql-tools/utils"

const notifications: any[] = []

export const resolvers: IResolvers = {
  Query: { notifications: () => notifications },
}
