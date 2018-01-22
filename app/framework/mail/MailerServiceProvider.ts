import { Application, ServiceProvider } from '~/framework/foundation'
import { Logger } from '~/framework/log'

import { Mailer } from './Mailer'
import { MailerConfig, MailerAdapterType } from './MailerConfig'
import { MailerAdapter } from './adapters/MailerAdapter'
import { SmtpMailerAdapter, SmtpMailerAdapterConfig } from './adapters/SmtpMailerAdapter'
import { DummyMailerAdapter } from './adapters/DummyMailerAdapter'

export class MailerServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        app.singleton<Mailer>('mailer', app => {
            const config = app.config.mail
            const adapter = this.getAdapter(app)
            const logger = app.make<Logger>('log')

            return new Mailer(config, adapter, logger)
        })
    }

    public getAdapter(app: Application): MailerAdapter {
        const config = <MailerConfig> app.config.mail

        const driver = config.driver
        const driverConfig = <any> config.drivers[driver]

        if (! driverConfig) {
            throw new Error(`Configured mail driver [${driver}] does not exist, did you forget to create it?`)
        }

        const adapter = driverConfig.adapter

        switch (adapter) {
            case MailerAdapterType.SMTP: return new SmtpMailerAdapter(<SmtpMailerAdapterConfig> driverConfig)
            case MailerAdapterType.DUMMY: {
                config.log = true
                return new DummyMailerAdapter()
            }
            default: throw new Error(`Configured mail adapter [${adapter}] for driver [${driver}] does not exist`)
        }
    }

}
