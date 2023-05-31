import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { providerEntity } from "./provider.Entity";

@Entity('service')
export class serviceEntity {
    @PrimaryColumn()
    service_id: string;
  
    @Column({ type: 'character varying', length: 30, unique: true , nullable : false })
    service_code: string;
  
    @Column({ type: 'smallint' , nullable : false})
    service_type: number;
  
    @Column({ type: 'text' , nullable : false })
    service_name: string;
  
    @Column({ type: 'integer', nullable : false  })
    service_fee: number;
  
    @Column({ type: 'smallint', nullable : false })
    service_status: number;
    
    // FK 
    @ManyToOne(() => providerEntity , {eager : true})
    @JoinColumn({ name: 'provider_code' })
    provider_code: string;

    @Column({ type: 'smallint', default: 0 , nullable : false  })
    editable_amount: number;
  
    @Column({ type: 'character varying', length: 50 , nullable : false })
    provider_service_id: string;
  
    @CreateDateColumn({type : 'timestamp with time zone' , nullable : false})
    created_at: Date; 

    @Column({ type: 'smallint' , nullable : false })
    require_calfee: number;
  
    @CreateDateColumn({ type: 'timestamp with time zone' , nullable : false })
    latest_fee_at: Date;
  

} 