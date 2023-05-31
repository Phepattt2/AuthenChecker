import { UUID } from "crypto";

export class AppAuthDTO {
    app_id : UUID ;
    app_secret : string ; 
    app_name : string ;
    app_status : number ;
    created_at : Date ; 
    updated_at : Date ;
} 