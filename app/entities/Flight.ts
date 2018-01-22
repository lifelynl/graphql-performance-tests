import { Airport } from '~/entities/Airport'
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, RelationId } from 'typeorm'

import { Passenger } from './Passenger'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Flight extends BaseEntity {

    @Column()
    public name: string

    @ManyToOne(type => Airport, airport => airport.outgoingFlights)
    @JoinColumn()
    public sourceAirport: Airport

    @ManyToOne(type => Airport, airport => airport.incomingFlights)
    @JoinColumn()
    public destinationAirport: Airport

    @ManyToMany(type => Passenger)
    @JoinTable({ name: 'flight_has_passengers' })
    public passengers: Passenger[]

    // Below are two fields that are not necessary but serve their purpose for the examples given

    @RelationId((flight: Flight) => flight.sourceAirport)
    public sourceAirportId: number

    @RelationId((flight: Flight) => flight.destinationAirport)
    public destinationAirportId: number
}
