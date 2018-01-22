import { MailerAdapterType } from '../MailerConfig'
import { MailerAdapter } from './MailerAdapter'
import { Mail } from '../Mail'

export interface DummyMailerAdapterConfig {
    adapter: MailerAdapterType.DUMMY
}

export class DummyMailerAdapter implements MailerAdapter {

    public async send(mail: Mail): Promise<boolean> {
        return true
    }

}
