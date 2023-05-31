import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'  ;
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { app_auth } from './app-auth.Entity';

@Entity("testEntity")
export class transactionEntity {
    @PrimaryColumn({ length: 20, default: () => 'public.gen_ref_id()', nullable: false })
    refId: string;

    @ManyToOne(() => app_auth , {eager : true})
    @JoinColumn({ name : 'app_id'})
    app_id: app_auth;
  
    // @Column({ type: 'smallint', nullable: false })
    // txnStatus: number;
  
    // @ManyToOne(() => ServiceEntity)
    // service: ServiceEntity;
  
    // @Column({ length: 50, nullable: true })
    // serviceTxnId: string;
  
    // @Column({ type: 'text', nullable: true })
    // serviceSession: string;
  
    // @Column({ length: 50, nullable: false })
    // reference1: string;
  
    // @Column({ length: 50, nullable: true })
    // reference2: string;
  
    // @Column({ length: 50, nullable: true })
    // reference3: string;
  
    // @Column({ length: 50, nullable: true })
    // reference4: string;
  
    // @Column({ length: 50, nullable: true })
    // reference5: string;
  
    // @Column({ length: 50, nullable: true })
    // reference6: string;
  
    // @Column({ type: 'smallint', nullable: false })
    // deviceType: number;
  
    // @Column({ length: 50, nullable: false })
    // deviceId: string;
  
    // @Column({ length: 50, nullable: true })
    // locationId: string;
  
    // @Column({ length: 50, nullable: true })
    // cashierId: string;
  
    // @Column({ type: 'json', nullable: true })
    // txnDetail: any;
  
    // @Column({ type: 'integer', nullable: true })
    // amount: number;
  
    // @Column({ type: 'integer', nullable: true })
    // fee: number;
  
    // @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date;
  
    // @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    // paidAt: Date;
}
