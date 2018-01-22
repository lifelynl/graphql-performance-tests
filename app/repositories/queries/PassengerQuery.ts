import { Passenger } from '~/entities/Passenger'

import { Query } from './Query'

export interface PassengerFilters {
    name?: string
}

export class PassengerQuery extends Query<Passenger> {

    public filter(filters: PassengerFilters): this {
        const { name } = filters

        if (name) {
            this.andWhere('LOWER(passenger.name) = LOWER(:name)', { name })
        }

        return this
    }

}
