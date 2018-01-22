import { EntityRepository, getCustomRepository } from 'typeorm'

import { Flight } from '~/entities/Flight'

import { BaseRepository } from './BaseRepository'
import { FlightQuery } from './queries/FlightQuery'

export const getFlightRepository = () => getCustomRepository(FlightRepository)
export const getFlightQuery = () => new FlightQuery(getFlightRepository())

@EntityRepository(Flight)
export class FlightRepository extends BaseRepository<Flight> {

    /**
     * Find one Flight by name
     */
    public findByName(name: string): Promise<Flight> {
        return this.findOne({ name })
    }

}
