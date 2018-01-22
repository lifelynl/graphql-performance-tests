import { Mail } from '../Mail'

export interface MailerAdapter {

    send(mail: Mail): Promise<boolean>

}
