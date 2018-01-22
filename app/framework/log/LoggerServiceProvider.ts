import { Application, ServiceProvider } from '~/framework/foundation'

import { Logger } from './Logger'
import { LoggerConfig, LoggerAdapterType } from './LoggerConfig'
import { LoggerAdapter } from './adapters/LoggerAdapter'
import { ConsoleLoggerAdapter, ConsoleLoggerAdapterConfig } from './adapters/ConsoleLoggerAdapter'

export class LoggerServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        app.singleton<Logger>('log', app => {
            const adapter = this.getAdapter(app)
            return new Logger(adapter)
        })
    }

    public getAdapter(app: Application): LoggerAdapter {
        const config = <LoggerConfig> app.config.log

        const adapter = config.default
        const adapterConfig = <any> config.adapters[adapter]

        if (! adapterConfig) {
            throw new Error(`Configured logger adapter ${adapter} does not exist`)
        }

        switch (adapterConfig.adapter) {
            case LoggerAdapterType.CONSOLE: return new ConsoleLoggerAdapter(<ConsoleLoggerAdapterConfig> adapterConfig)
            default: throw new Error(`Configured logger adapter ${adapterConfig.adapter}`)
        }
    }

}
