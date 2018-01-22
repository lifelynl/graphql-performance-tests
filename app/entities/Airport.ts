import { Entity, Column, JoinColumn, OneToMany } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Flight } from './Flight'

@Entity()
export class Airport extends BaseEntity {

    @Column()
    public name: string

    @OneToMany(type => Flight, flight => flight.sourceAirport)
    @JoinColumn()
    public outgoingFlights: Flight[]

    @OneToMany(type => Flight, flight => flight.destinationAirport)
    @JoinColumn()
    public incomingFlights: Flight[]

}
