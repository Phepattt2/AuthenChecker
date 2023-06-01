export function ranString(length : number) : string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function addZero( val : number ):string{
    var stringVal = val.toString() ;
    if(stringVal.length <= 1 ){
        stringVal = "0" + stringVal ; 
    }
    return stringVal ;
}

export function gen_ref_id(len : number  ) : string {
    const current = new Date();
    var month = addZero(current.getUTCMonth() + 1) //months from 1-12
    var day = addZero(current.getUTCDate())
    var year = current.getUTCFullYear().toString();
    var hour = addZero(current.getHours())
    const ref_id = year + month + day + hour + ranString(len) ;
    return ref_id ; 
} 

