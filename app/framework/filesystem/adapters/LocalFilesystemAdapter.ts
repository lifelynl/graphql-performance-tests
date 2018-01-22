import * as url from 'url'
import * as path from 'path'
import * as fs from 'fs-extra'
import { Readable } from 'stream'

import { BaseFilesystemAdapter } from './BaseFilesystemAdapter'
import { FilesystemAdapterType } from '../FilesystemConfig'

export interface LocalFilesystemAdapterConfig {
    adapter: FilesystemAdapterType.LOCAL
    basePath: string
    baseUrl?: string
}

export class LocalFilesystemAdapter extends BaseFilesystemAdapter {

    constructor(private config: LocalFilesystemAdapterConfig) {
        super()
    }

    public async read(filePath: string): Promise<Readable> {
        return fs.createReadStream(this.getLocalPath(filePath))
    }

    public async write(filePath: string, readStream): Promise<void> {
        await this.ensureDirectoryExists(this.getLocalPath(filePath))

        if (typeof readStream === 'string' || readStream instanceof Buffer) {
            return fs.writeFile(this.getLocalPath(filePath), readStream)
        }

        return new Promise<void>((resolve, reject) => {
            const writeStream = fs.createWriteStream(this.getLocalPath(filePath))
            writeStream.on('close', resolve)
            readStream.pipe(writeStream)
        })
    }

    public async append(filePath: string, readStream): Promise<void> {
        await this.ensureDirectoryExists(this.getLocalPath(filePath))

        if (typeof readStream === 'string' || readStream instanceof Buffer) {
            return fs.appendFile(this.getLocalPath(filePath), readStream)
        }

        return new Promise<void>((resolve, reject) => {
            const writeStream = fs.createWriteStream(this.getLocalPath(filePath), { flags: 'a' })
            writeStream.on('close', resolve)
            readStream.pipe(writeStream)
        })
    }

    public async isFile(filePath: string): Promise<boolean> {
        try {
            return (await fs.stat(this.getLocalPath(filePath))).isFile()
        } catch (error) {
            return false
        }
    }

    public async isDirectory(filePath: string): Promise<boolean> {
        try {
            return (await fs.stat(this.getLocalPath(filePath))).isDirectory()
        } catch (error) {
            return false
        }
    }

    public async deleteDirectory(filePath: string): Promise<void> {
        if (await this.isDirectory(filePath)) {
            await fs.emptyDir(this.getLocalPath(filePath))
        }
    }

    public async exists(filePath: string): Promise<boolean> {
        return fs.existsSync(this.getLocalPath(filePath))
    }

    public async delete(filePath: string): Promise<void> {
        return fs.unlink(this.getLocalPath(filePath))
    }

    public async url(filePath: string): Promise<string> {
        let baseUrl = this.config.baseUrl

        // Make sure that we end the base url with a slash, otherwise
        // url.resolve() will strip the last directory from the path
        if (baseUrl.substring(baseUrl.length - 1) !== '/') {
            baseUrl = `${baseUrl}/`
        }

        return url.resolve(baseUrl, filePath)
    }

    private ensureDirectoryExists(relativeFilePath: string): Promise<void> {
        return fs.mkdirp(path.dirname(relativeFilePath))
    }

    private getLocalPath(relativeFilePath: string): string {
        if (path.isAbsolute(relativeFilePath)) {
            return relativeFilePath
        }

        return path.join(this.config.basePath, relativeFilePath)
    }

}
