import { createConnection, Connection } from 'typeorm'
import { log } from '~/framework'

let instance: Connection = null

export const db = async (): Promise<Connection> => {
    if (! instance) {
        try {
            instance = await createConnection()
        } catch (err) {
            log().error(`Cannot connect to database. Is the database running? Error: ${err.message}`)
            process.exit(1)
        }
    }

    return instance
}
