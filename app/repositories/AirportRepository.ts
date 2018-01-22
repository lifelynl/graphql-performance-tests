import { EntityRepository, getCustomRepository } from 'typeorm'

import { Airport } from '~/entities/Airport'

import { BaseRepository } from './BaseRepository'
import { AirportQuery } from './queries/AirportQuery'

export const getAirportRepository = () => getCustomRepository(AirportRepository)
export const getAirportQuery = () => new AirportQuery(getAirportRepository())

@EntityRepository(Airport)
export class AirportRepository extends BaseRepository<Airport> {

}
