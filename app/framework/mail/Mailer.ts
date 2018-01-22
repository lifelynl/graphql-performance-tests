import outdent from 'outdent'
import chalk from 'chalk'

import { Logger } from '~/framework/log'
import { Mail } from './Mail'
import { MailerConfig } from './MailerConfig'
import { MailerAdapter } from './adapters/MailerAdapter'

export class Mailer {

    constructor(
        private config: MailerConfig,
        private adapter: MailerAdapter,
        private logger: Logger,
    ) {}

    /**
     * Send an email, takes the defaults as configured into account
     */
    public async send(mail: Mail): Promise<boolean> {
        mail = {
            ...this.config.defaults,
            ...mail
        }

        if (this.config.log) {
            this.log(mail)
        }

        return this.adapter.send(mail)
    }

    /**
     * Log an email to the console for debugging purposes
     */
    public log(mail: Mail): void {
        this.logger.info(`Mail would've been send if you provide an active adapter`)
        this.logger.info(outdent`\n\n
            Subject: ${chalk.gray(mail.subject)}
            From: ${chalk.gray(`${mail.fromName} <${mail.fromEmail}>`)}
            To: ${chalk.gray(mail.to instanceof Array ? mail.to.join(', ') : mail.to)}

            ${chalk.gray(mail.html)}
        `)
    }

}
