import { providerEntity } from "src/entity/provider.Entity";

export class serviceDTO {
    service_id: number;
    
    service_code: string;
    
    service_type: number;
    
    service_name: string;
    
    service_fee: number;
    
    service_status: number;
    
    provider_code: string;
    
    editable_amount: number;
    
    provider_service_id: string;
    
    created_at: Date;
    
    require_calfee: number;
    
    latest_fee_at: Date;
} 