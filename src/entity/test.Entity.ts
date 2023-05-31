import { UUID } from 'crypto';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'  ;

@Entity("testEntity")
export class testEntity {
    @PrimaryGeneratedColumn() 
    id : number ;
    @Column({ unique : false , nullable : true})
    user : string ; 
    @Column({ unique : false , nullable : true})
    email : string
    @Column({ unique : false , nullable : true})
    age : number ;
}