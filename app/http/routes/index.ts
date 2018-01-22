import { Express } from 'express'
import { graphiqlExpress } from 'apollo-server-express'

import { config } from '~/config'
import { graphQLHandler } from '~/http/routes/graphQLHandler'

export function registerRoutes(app: Express) {

    app.options('/graphql')
    app.use('/graphql', graphQLHandler)

    if (config.app.env !== 'production') {
        app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
    }
}
