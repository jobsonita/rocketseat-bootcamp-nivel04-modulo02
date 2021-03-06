import { container } from 'tsyringe'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
