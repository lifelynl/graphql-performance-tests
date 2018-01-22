import chalk from 'chalk'
import { Request } from 'express'
import { graphqlExpress } from 'apollo-server-express'

import { schema } from '~/http/graphql'
import { graphQLErrorHandler } from '~/http/graphql/errors/graphQLErrorHandler'
import { createDataLoaders, Loaders } from '~/utils/createDataLoaders'
import { config } from '~/config'
import { log } from '~/framework'

export type Context = {} & Loaders

export const graphQLHandler = graphqlExpress(async (request: Request) => {
    const context = <Context> {
        ...createDataLoaders()
    }

    log().info('')
    log().info('')
    log().info('')
    log().info('GraphQL request:', chalk.grey(request.body.query) as any)
    log().info('')
    log().info('')
    log().info('')

    return {
        schema: schema,
        context: context,
        formatError: graphQLErrorHandler,
        tracing: !! config.apolloEngineKey,
    }
})
