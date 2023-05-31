import { randomUUID, randomBytes } from 'crypto';
// gen UUID , randomByte then encrypt to base64 /
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'  ;

@Entity()
export class app_auth {
    // backend generated 
    @PrimaryColumn({ type: 'uuid' })

    app_id : string ;
    @Column({nullable : false })
    app_secret : string ;
    @Column({nullable : false })
    app_name : string ;
    @Column({nullable : false })
    app_status : number ;
    @CreateDateColumn({nullable : false })
    created_at : Date ; 
    @CreateDateColumn({nullable : false })
    updated_at : Date ;
}