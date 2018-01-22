import 'reflect-metadata'

import * as dotenv from 'dotenv'
import * as commander from 'commander'
import { createConnection } from 'typeorm'

import { log } from '~/framework'
import { Program } from './Program'
import { EntityGeneratorProgram } from './programs/generators/EntityGeneratorProgram'

dotenv.config()

// Catch uncaughtException
process.on('uncaughtException', (uncaughtException: Error) => {

    // Log the errors
    log().error(`uncaughtException: ${uncaughtException.stack}`)

    // Exit the process.
    process.exit(1)
})

// Catch uncaught promise rejections
process.on('unhandledRejection', (unhandledRejection: Error) => {

    // Log the errors
    log().error(`unhandledRejection: ${unhandledRejection.stack}`)

    // Exit the process.
    process.exit(1)
})

// When the process ends.
process.on('SIGINT', async () => {
    log().info('Exiting process with code 0...')
    process.exit(0)
})

; (async () => {
    await createConnection()

    const programs: Program[] = [
        new EntityGeneratorProgram(),
    ]

    for (const program of programs) {
        commander.executeSubCommand = () => false

        const c = commander.command(program.command)

        for (const option of program.options) {
            c.option(option.option, option.description, option.validate, option.default)
        }

        c.action(async (...args) => {
            await program.run(...args)
            process.exit(0)
        })
    }

    if (process.argv.length === 2) {
        commander.outputHelp()
    } else {
        commander.parse(process.argv)
    }
})()
