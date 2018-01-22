export interface Mail {
    fromName?: string
    fromEmail?: string
    to: string | string[]
    subject: string
    html: string
}
