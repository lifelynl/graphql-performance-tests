import chalk from 'chalk'
import * as winston from 'winston'

import { LoggerAdapterType, LoggerLevel } from '../LoggerConfig'
import { LoggerAdapter } from './LoggerAdapter'

export interface ConsoleLoggerAdapterConfig {
    adapter: LoggerAdapterType.CONSOLE
    level: LoggerLevel
}

export class ConsoleLoggerAdapter implements LoggerAdapter {

    private logger: winston.LoggerInstance

    constructor(config: ConsoleLoggerAdapterConfig) {
        const transports = []

        transports.push(new (winston.transports.Console)({
            level: config.level,
            timestamp: function () {
                return (new Date).toISOString()
            },
            formatter: function (options) {
                const level = winston.config.colorize(options.level, options.level.toUpperCase().padEnd(5))
                const timestamp = options.timestamp()
                const message = options.message
                const meta = options.meta && Object.keys(options.meta).length ? `\n${JSON.stringify(options.meta, null, 4)}` : ''

                return `${level} ${chalk.gray(timestamp)} ${message} ${chalk.gray(meta)}`
            }
        }))

        this.logger = new (winston.Logger)({ transports })
    }

    public log(level: LoggerLevel, message: string, meta: object = {}) {
        switch (level) {
            case LoggerLevel.DEBUG: this.logger.debug(message, meta); break
            case LoggerLevel.INFO: this.logger.info(message, meta); break
            case LoggerLevel.WARN: this.logger.warn(message, meta); break
            case LoggerLevel.ERROR: this.logger.error(message, meta); break
            default: throw new Error(`Trying to log with level [${level}] which does not exist`)
        }
    }

}
