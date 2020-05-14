import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
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

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}