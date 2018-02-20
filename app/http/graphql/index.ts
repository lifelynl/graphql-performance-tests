import { GraphQLSchema } from 'graphql'

import { rootQuery } from './query'
import { rootMutation } from './mutation'

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})
