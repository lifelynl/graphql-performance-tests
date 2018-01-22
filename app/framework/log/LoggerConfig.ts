import { ConsoleLoggerAdapterConfig } from './adapters/ConsoleLoggerAdapter'

export enum LoggerLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export enum LoggerAdapterType {
    CONSOLE = 'console'
}

export interface LoggerConfig {
    default: string
    adapters: {
        [s: string]: ConsoleLoggerAdapterConfig
    }
}
