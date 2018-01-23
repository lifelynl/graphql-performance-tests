import { Request } from 'express'
import { graphqlExpress } from 'apollo-server-express'

import { schema } from '~/http/graphql'
import { graphQLErrorHandler } from '~/http/graphql/errors/graphQLErrorHandler'
import { createDataLoaders, Loaders } from '~/utils/createDataLoaders'
import { config } from '~/config'

export type Context = {} & Loaders

export const graphQLHandler = graphqlExpress(async (request: Request) => {
    const context = <Context> {
        ...createDataLoaders()
    }

    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H')

    return {
        schema: schema,
        context: context,
        formatError: graphQLErrorHandler,
        tracing: !! config.apolloEngineKey,
    }
})
