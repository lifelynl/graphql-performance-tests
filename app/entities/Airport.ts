import { Entity, Column, JoinColumn, OneToMany } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Flight } from './Flight'

@Entity()
export class Airport extends BaseEntity {

    @Column()
    public name: string

    @OneToMany(type => Flight, flight => flight.departureAirport)
    @JoinColumn()
    public departureFlights: Flight[]

    @OneToMany(type => Flight, flight => flight.arrivalAirport)
    @JoinColumn()
    public arrivalFlights: Flight[]

}
