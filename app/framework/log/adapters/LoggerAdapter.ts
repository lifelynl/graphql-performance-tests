import { LoggerLevel } from '../LoggerConfig'

export interface LoggerAdapter {

    log(level: LoggerLevel, message: string, meta?: any)

}
