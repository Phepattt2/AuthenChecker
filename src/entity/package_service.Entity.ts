import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { app_auth } from "./app-auth.Entity";
import { serviceEntity } from "./service.Entity";

@Entity('package_service')
export class packageServiceEntity {
    
    @ManyToOne(()=>serviceEntity , {eager : true , cascade : true , onDelete : "CASCADE" } )
    @JoinColumn({name : 'service_id'})
    @PrimaryColumn({type:'integer' , nullable : false})
    service_id : number ;

    @PrimaryColumn({type:'character varying' , nullable : false ,length : 20})
    package_id : string ; 

    @Column({type:'text' , nullable : false})
    package_name_en : string ; 

    @Column({type:'text' , nullable : false})
    package_name_th : string ; 
    
    @Column({type:'integer' , nullable : false})
    package_price : number ; 

    @Column({type:'smallint' , nullable : false})
    package_validity : number ; 
    
    @Column({type:'character varying' ,length : 10 , nullable : false})
    package_validity_unit : string ; 
    
    @Column({type:'smallint' , nullable : true})
    package_type : number ; 
    
    @CreateDateColumn({ nullable : false , type : 'timestamp with time zone'})
    created_at : Date ; 

    @CreateDateColumn({ nullable : false , type : 'timestamp with time zone'})
    updated_at : Date ; 
}