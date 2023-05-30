import {Entity} from 'typeorm'  ;

@Entity('service')
export class serviceEntity {
    service_code : string ; 
    service_type : number ; 
    service_name : string ; 
    service_fee : number ; 
    service_status : number ;
    provider_code : string ; 
    provider_service_id : string ; 
    created_at : Date = new Date() ;
    require_calfee : number;
    latest_fee_at : Date = new Date() ;
}