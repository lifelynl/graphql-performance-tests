import { v1 as uuid } from 'uuid'

import { log } from '~/framework'
import { config } from '~/config'

export const graphQLErrorHandler = (error): object => {
    if (config.app.env !== 'development') {
        const errorId = uuid()

        // Log any errors that are not validation or auth errors.
        if (error.originalError && ! error.originalError.type) {
            log().error(`${error.name}(${errorId}):\n${error.stack}`)
        }

        return {
            type: error.originalError && error.originalError.type,
            message: error.originalError ? error.originalError.message : `Something went wrong ${errorId}`,
            args: error.originalError && error.originalError.args,
            path: error.path,
        }
    }

    return {
        name: error.name,
        type: error.originalError && error.originalError.type,
        message: error.message,
        args: error.originalError && error.originalError.args,
        path: error.path,
    }
}
