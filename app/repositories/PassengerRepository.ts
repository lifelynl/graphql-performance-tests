import { EntityRepository, getCustomRepository } from 'typeorm'

import { Passenger } from '~/entities/Passenger'

import { BaseRepository } from './BaseRepository'
import { PassengerQuery } from './queries/PassengerQuery'

export const getPassengerRepository = () => getCustomRepository(PassengerRepository)
export const getPassengerQuery = () => new PassengerQuery(getPassengerRepository())

@EntityRepository(Passenger)
export class PassengerRepository extends BaseRepository<Passenger> {

    /**
     * Find one Passenger by name
     */
    public findByName(name: string): Promise<Passenger> {
        return this.findOne({ name })
    }

}
