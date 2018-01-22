import { Repository } from 'typeorm'

export class NotFound extends Error {}

export abstract class BaseRepository<Entity> extends Repository<Entity> {

    public async findOneByIdOrFail(id: number): Promise<Entity> {
        const instance = await this.findOneById(id)

        if (! instance) {
            throw new NotFound('Company not found.')
        }

        return instance
    }

}
