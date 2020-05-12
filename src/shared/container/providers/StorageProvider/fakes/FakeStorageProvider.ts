import IStorageProvider from '../models/IStorageProvider'

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file)

    return file
  }

  public async deleteFile(fileToDelete: string): Promise<void> {
    const fileIndex = this.storage.findIndex((file) => file === fileToDelete)

    this.storage.splice(fileIndex, 1)
  }
}
