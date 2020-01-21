export const handleRequestErrors = (error)=>{
    // console.log('error type',  error.toString())
    if(error!==undefined){
        if(typeof error.response ==="object"){
            // console.log('error keys', error.response);
            if(error.response && error.response.data.message!==null){
                return error.response.data.message;
            }
            // if(error.message){
            //     if(error.message==='Request failed with status code 400'){
            //         return "An error occured. Please try again";
            //     }
            //     return error.message;
            // }
            // console.log('final');
            return "Something went wrong. Please try again";
        }

        if(error.toString()==="Error: Network Error"){
            return "Please check your network and try again"
        }
        return error
    }

    
    return "Something went wrong. Please try again";
}


export const getDateFromISO =(date) =>{
    let toUse = new Date(date);
    let convertedDate = toUse.toUTCString().split(' ').slice(0, 4).join(' ');

    return convertedDate;
    // console.log(year+'-' + month + '-'+dt) 
}

export const accountNumber = (accountNum)=>{
    var reg = /^\d+$/;
    if(reg.test(accountNum)){
        if(accountNum.toString().length<=10){
            return accountNum;
        }else{
            return accountNum.toString().substr(0,10);
        }
    }else{

        return "";
    }
}

export const numberWithCommas= (amount)=> {
    let testSequence = /^[0-9.,]+$/;
    // let testSequence = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/;
    if(amount!==undefined && amount!==''){
        let amountFiltered ;

        if(!testSequence.test(amount)){
            return "";
        }
    // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});
        
        // if(amount.indexOf(',')>-1){
             amountFiltered = amount.toString().replace(/,/g, '');
        // }
        
        return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
       
        
    }
}