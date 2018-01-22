import * as express from 'express'
import { json } from 'body-parser'

import { registerRoutes } from '~/http/routes'
import { log } from '~/framework'
import { config } from '~/config'

export const startHttpServer = async () => {

    const app = express()

    app.use(json())

    registerRoutes(app)

    app.listen(config.app.port, async () => {
        log().info(`Api server started at ${config.app.serverUrl}`)
    })
}
