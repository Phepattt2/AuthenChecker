import { randomUUID, randomBytes } from 'crypto';
// gen UUID , randomByte then encrypt to base64 /
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'  ;

@Entity('app_auth')
export class app_auth {
    // backend generated 
    @PrimaryColumn({ type: 'uuid' })
    app_id : string ;

    @Column({nullable : false , type : 'text'})
    app_secret : string ;

    @Column({nullable : false ,type : 'text' })
    app_name : string ;
    
    @Column({nullable : false , type : 'smallint'})
    app_status : number ;
    
    @CreateDateColumn({nullable : false , type : 'timestamp with time zone'})
    created_at : Date ; 
    
    @CreateDateColumn({nullable : false , type : 'timestamp with time zone' })
    updated_at : Date ;
}