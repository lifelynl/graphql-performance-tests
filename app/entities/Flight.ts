import { Airport } from '~/entities/Airport'
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, RelationId } from 'typeorm'

import { Passenger } from './Passenger'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Flight extends BaseEntity {

    @Column()
    public name: string

    @ManyToOne(type => Airport, airport => airport.departureFlights)
    @JoinColumn()
    public departureAirport: Airport

    @ManyToOne(type => Airport, airport => airport.arrivalFlights)
    @JoinColumn()
    public arrivalAirport: Airport

    @ManyToMany(type => Passenger)
    @JoinTable({ name: 'flight_has_passengers' })
    public passengers: Passenger[]

    // Below are two fields that are not necessary but serve their purpose for the examples given

    @RelationId((flight: Flight) => flight.departureAirport)
    public departureAirportId: number

    @RelationId((flight: Flight) => flight.arrivalAirport)
    public arrivalAirportId: number
}
