import 'reflect-metadata'

import { db } from '~/db'
import { startHttpServer } from '~/http'
import { log } from '~/framework'

import { setupDatabase } from './setup'

// Catch uncaughtException
process.on('uncaughtException', (uncaughtException: Error) => {

    // Log the errors
    log().error(`You have an uncaught exception in your code:\n${uncaughtException.stack}`)

})

// Catch uncaught promise rejections
process.on('unhandledRejection', (unhandledRejection: Error) => {

    // Log the errors
    log().error(`You have an unhandled rejection in your code:\n${unhandledRejection.stack}`)

})

// When the process ends.
process.on('SIGINT', async () => {
    try {
        log().info('Exiting process with code 0...')
    } catch (err) {
        // tslint:disable-next-line:no-console
        log().error(`You have an error in the SIGINT handler:\n${err.stack}`)
    }

    process.exit(0)
})

// Bootstrap the server.
; (async () => {
    // Create the database connection.
    await db()

    // Start the http server.
    await startHttpServer()

    // Setup the database with required values.
    try {
        await setupDatabase()
    } catch (e) {
        log().info(`Looks like no migrations have ran yet so unable to setup database. ${e}`)
    }
})()
