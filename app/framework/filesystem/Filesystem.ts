import { Readable } from 'stream'

import { FilesystemAdapter } from './adapters/FilesystemAdapter'

export class Filesystem implements FilesystemAdapter {

    constructor(
        private adapter: FilesystemAdapter
    ) {}

    public async read(filePath: string): Promise<Readable> {
        return await this.adapter.read(filePath)
    }

    public async write(filePath: string, readStream): Promise<void> {
        return await this.adapter.write(filePath, readStream)
    }

    public async append(filePath: string, readStream): Promise<void> {
        return await this.adapter.append(filePath, readStream)
    }

    public async isFile(filePath: string): Promise<boolean> {
        return await this.adapter.isFile(filePath)
    }

    public async isDirectory(filePath: string): Promise<boolean> {
        return await this.adapter.isDirectory(filePath)
    }

    public async exists(filePath: string): Promise<boolean> {
        return await this.adapter.exists(filePath)
    }

    public async delete(filePath: string): Promise<void> {
        return await this.adapter.delete(filePath)
    }

    public async deleteDirectory(filePath: string): Promise<void> {
        return await this.adapter.deleteDirectory(filePath)
    }

    public async url(filePath: string): Promise<string> {
        return await this.adapter.url(filePath)
    }

    public async mime(filePath: string): Promise<string> {
        return await this.adapter.mime(filePath)
    }

    public async extension(filePath: string): Promise<string> {
        return await this.adapter.extension(filePath)
    }

}
