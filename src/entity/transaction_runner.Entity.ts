import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity('transaction_runner')

export class transactionRunnerEntity {
    
    @PrimaryColumn({type:'character varying' , length : 10 ,  nullable : false})
    runner_key : string ;

    @Column({ type: 'integer' , nullable : false  })
    runner_count : number ; 

}