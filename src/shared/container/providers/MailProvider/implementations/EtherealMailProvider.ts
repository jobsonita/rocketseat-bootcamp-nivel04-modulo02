import nodemailer, { Transporter } from 'nodemailer'

import IMailProvider from '../models/IMailProvider'

export default class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    console.log('Ethereal Mail Provider: Connecting to service...')
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
      })
      .then(() => console.log('Ethereal Mail Provider: connected!'))
      .catch((err) => console.error('Ethereal Mail Provider: ', err))
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
