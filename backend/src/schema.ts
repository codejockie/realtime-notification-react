import "graphql-import-node"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLSchema } from "graphql"
import { resolvers } from "./resolverMap"
import * as typeDefs from "./schema/schema.graphql"

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
