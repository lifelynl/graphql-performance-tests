import * as path from 'path'
import { S3 } from 'aws-sdk'
import { Readable } from 'stream'

import { BaseFilesystemAdapter } from './BaseFilesystemAdapter'
import { FilesystemAdapterType } from '../FilesystemConfig'

export interface S3FilesystemAdapterConfig {
    adapter: FilesystemAdapterType.S3
    bucket: string
    region: string
    accessKeyId: string
    secretAccessKey: string
    basePath?: string
}

export class S3FilesystemAdapter extends BaseFilesystemAdapter {

    private s3: S3

    constructor(private config: S3FilesystemAdapterConfig) {
        super()

        this.s3 = new S3({
            apiVersion: '2006-03-01',
            region: config.region,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            }
        })
    }

    public async read(filePath: string): Promise<Readable> {
        return this.s3.getObject({
            Bucket: this.config.bucket,
            Key: this.getKey(filePath)
        }).createReadStream()
    }

    public async write(filePath: string, readStream): Promise<void> {
        return await new Promise<void>(async (resolve, reject) => {
            this.s3.upload({
                Bucket: this.config.bucket,
                Key: this.getKey(filePath),
                Body: readStream,
                ContentType: await this.mime(filePath)
            }, (error, data) => {
                if (error) {
                    reject(error)
                }

                resolve()
            })
        })
    }

    public async append(filePath: string, readStream): Promise<void> {
        throw new Error('File appending is not supported for S3')
    }

    public async isFile(filePath: string): Promise<boolean> {
        throw new Error('Not implemented')
    }

    public async isDirectory(filePath: string): Promise<boolean> {
        throw new Error('Not implemented')
    }

    public async exists(filePath: string): Promise<boolean> {
        return await new Promise<boolean>((resolve, reject) => {
            this.s3.headObject({
                Bucket: this.config.bucket,
                Key: this.getKey(filePath),
            }, (error, data) => {
                // Forbidden as a result means that the file does not exist
                if (error && error.name === 'Forbidden') {
                    resolve(false)
                }

                if (error) {
                    reject(error)
                }

                resolve(true)
            })
        })
    }

    public async delete(filePath: string): Promise<void> {
        return await new Promise<void>((resolve, reject) => {
            this.s3.deleteObject({
                Bucket: this.config.bucket,
                Key: this.getKey(filePath)
            }, (error, data) => {
                if (error) {
                    reject(error)
                }

                resolve()
            })
        })
    }

    public async deleteDirectory(filePath: string): Promise<void> {
        throw new Error('Not implemented')
    }

    public async url(filePath: string): Promise<string> {
        const { region, bucket } = this.config
        const key = this.getKey(filePath)

        return `https://s3-${region}.amazonaws.com/${bucket}/${key}`
    }

    private getKey(filePath: string): string {
        const { basePath } = this.config

        return basePath ? path.join(basePath, filePath) : filePath
    }

}
