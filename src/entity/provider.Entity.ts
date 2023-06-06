import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'  ;

@Entity("provider")
export class  providerEntity {
    @PrimaryColumn({ type : 'character varying' , length : 20 , nullable : false }) 
    provider_code : string ;
    @Column({  type : 'text' , nullable : false})
    provider_name : string ; 
    @CreateDateColumn({ nullable : false , type : 'timestamp with time zone'})
    created_at : Date ; 

}