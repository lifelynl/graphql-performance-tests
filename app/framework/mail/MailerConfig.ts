import { SmtpMailerAdapterConfig } from './adapters/SmtpMailerAdapter'
import { DummyMailerAdapterConfig } from './adapters/DummyMailerAdapter'

export enum MailerAdapterType {
    DUMMY = 'dummy',
    SMTP = 'smtp'
}

export interface MailerConfig {
    log?: boolean

    defaults?: {
        fromName?: string
        fromEmail?: string
    }

    driver: string
    drivers: {
        [s: string]: SmtpMailerAdapterConfig | DummyMailerAdapterConfig
    }
}
