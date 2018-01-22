import { GraphQLSchema } from 'graphql'

import { rootQuery } from './query'

export const schema = new GraphQLSchema({ query: rootQuery })
