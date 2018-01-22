import { LoggerLevel } from './LoggerConfig'
import { LoggerAdapter } from './adapters/LoggerAdapter'

export class Logger {

    constructor(protected adapter: LoggerAdapter) { }

    public async debug(message: string, meta?: object): Promise<void> {
        await this.adapter.log(LoggerLevel.DEBUG, message, meta)
    }

    public async info(message: string, meta?: object): Promise<void> {
        await this.adapter.log(LoggerLevel.INFO, message, meta)
    }

    public async warn(message: string, meta?: object): Promise<void> {
        await this.adapter.log(LoggerLevel.WARN, message, meta)
    }

    public async error(message: string, meta?: object): Promise<void> {
        await this.adapter.log(LoggerLevel.ERROR, message, meta)
    }

}
