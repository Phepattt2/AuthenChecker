import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { app_auth } from './app-auth.Entity';
import { serviceEntity } from './service.Entity';
import { generateKey } from 'crypto';

@Entity('transaction')

export class transactionEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn({ length: 20, type: 'character varying', nullable: false , generated : true})
    ref_id: string;

    @ManyToOne(() => app_auth, { eager: true , cascade : true , onDelete : "CASCADE" })
    @JoinColumn({ name: 'app_id' })
    app_id: string;

    
    @Index("transaction_txn_status_index")
    @Column({ type: 'smallint', nullable: false })
    txn_status: number;

    @ManyToOne(() => serviceEntity, { eager: true , cascade : true , onDelete : "CASCADE" })
    @JoinColumn({ name: 'service_id' })
    service_id: number ; 

    @Column({ length: 50, nullable: true, type: 'character varying' })
    service_txn_id: string;

    @Index('transaction_reference1_index')
    @Column({ type: 'text', nullable: true })
    service_session: string;

    @Column({ length: 50, nullable: false })
    reference1: string;

    @Column({ length: 50, nullable: true })
    reference2: string;

    @Column({ length: 50, nullable: true })
    reference3: string;

    @Column({ length: 50, nullable: true })
    reference4: string;

    @Column({ length: 50, nullable: true })
    reference5: string;

    @Column({ length: 50, nullable: true })
    reference6: string;

    @Column({ type: 'smallint', nullable: false })
    device_type: number;

    @Column({ length: 50, nullable: false })
    device_id: string;

    @Column({ length: 50, nullable: true })
    location_id: string;

    @Column({ length: 50, nullable: true })
    cashier_id: string;

    @Column({ type: 'json', nullable: true })
    txn_detail: JSON;

    @Column({ type: 'integer', nullable: true })
    amount: number;

    @Column({ type: 'integer', nullable: true })
    fee: number;

    // @Column({ type: 'smallint', nullable: false , default : 0})
    // editable_amount: number;

    @Index('transaction_created_at_index')
    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false})
    created_at: Date;

    @Index('transaction_paid_at_index')
    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    paid_at: Date;
}
