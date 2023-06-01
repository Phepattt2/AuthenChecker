import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { app_auth } from "./app-auth.Entity";
import { serviceEntity } from "./service.Entity";

@Entity('app_service_map')
export class appServiceMapEntity {
    @ManyToOne(()=>app_auth , {eager : true , cascade : true , onDelete : "CASCADE" } )
    @JoinColumn({name : 'app_id'})
    @PrimaryColumn({type:'uuid' , nullable : false})
    app_id : string ;

    @ManyToOne(()=>serviceEntity , {eager : true , cascade : true , onDelete : "CASCADE" } )
    @JoinColumn({name : 'service_id'})
    @PrimaryColumn({type:'integer' , nullable : false})
    service_id : number ; 

    @Column({name : 'created_at' , type : 'timestamp with time zone' , nullable : false})
    created_at : Date ; 
}