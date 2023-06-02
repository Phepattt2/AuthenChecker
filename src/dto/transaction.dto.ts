
export class transactionDTO {

    ref_id: string;

    app_id: string;

    txn_status: number;

    service_id: number;
    
    service_txn_id: string;
    
    service_session: string;
    
    reference1: string;
    
    reference2: string;
    
    reference3: string;
    
    reference4: string;
    
    reference5: string;
    
    reference6: string;
    
    device_type: number;
    
    device_id: string;
    
    location_id: string;
    
    cashier_id: string;
    
    txn_detail: JSON;
    
    amount: number;
    
    fee: number;

    // editable_amount: number;

    created_at: Date;
    
    paid_at: Date;
} 