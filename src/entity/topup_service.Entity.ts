import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { app_auth } from "./app-auth.Entity";
import { serviceEntity } from "./service.Entity";

@Entity('topup_service')
export class topUpServiceEntity {
    
    @ManyToOne(()=>serviceEntity , {eager : true , cascade : true , onDelete : "CASCADE" } )
    @JoinColumn({name : 'service_id'})
    @PrimaryColumn({type:'integer' , nullable : false})
    service_id : number ;

    @PrimaryColumn({type:'smallint' , nullable : false })
    topup_order : number ; 

    @Column({type:'integer' , nullable : false})
    topup_amount : number ; 

    @CreateDateColumn({ nullable : false , type : 'timestamp with time zone'})
    updated_at : Date ; 
}
