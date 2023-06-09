import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn , PrimaryGeneratedColumn} from "typeorm";


@Entity('transaction_runner')

export class transactionRunnerEntity {
    
    @PrimaryColumn({ length: 10, type: 'character varying', nullable: false , generated : false})
    runner_key: string;

    @Column({ type: 'integer' , nullable : false  })
    runner_count : number ; 

}