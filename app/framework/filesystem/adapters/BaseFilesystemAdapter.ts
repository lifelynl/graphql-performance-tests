import * as path from 'path'
import * as mime from 'mime'
import { Readable } from 'stream'
import { FilesystemAdapter } from './FilesystemAdapter'

export abstract class BaseFilesystemAdapter implements FilesystemAdapter {

    public abstract read(filePath: string): Promise<Readable>

    public abstract write(filePath: string, readStream: Buffer): Promise<void>
    public abstract write(filePath: string, readStream: string): Promise<void>
    public abstract write(filePath: string, readStream: Readable): Promise<void>

    public abstract append(filePath: string, readStream: Buffer): Promise<void>
    public abstract append(filePath: string, readStream: string): Promise<void>
    public abstract append(filePath: string, readStream: Readable): Promise<void>

    public abstract isFile(filePath: string): Promise<boolean>
    public abstract isDirectory(filePath: string): Promise<boolean>

    public abstract exists(filePath: string): Promise<boolean>
    public abstract delete(filePath: string): Promise<void>
    public abstract deleteDirectory(filePath: string): Promise<void>
    public abstract url(filePath: string): Promise<string>

    public async mime(filePath: string): Promise<string> {
        return mime.getType(filePath)
    }

    public async extension(filePath: string): Promise<string> {
        const isMime = /^[a-zA-Z0-9-\.]\/[a-zA-Z0-9-\.]$/.test(filePath)

        if (isMime) {
            return mime.getExtension(filePath)
        }

        return path.extname(filePath).replace('.', '')
    }

}
