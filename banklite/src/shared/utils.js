export const handleRequestErrors = (error)=>{
    // console.log('error type', typeof error)
    if(error!==undefined){
        if(typeof error.response ==="object"){
            console.log('error keys', error.response);
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

export const numberWithCommas= (amount)=> {
    if(amount!==undefined && amount!==''){
        let amountFiltered ;
    // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});
        
        // if(amount.indexOf(',')>-1){
             amountFiltered = amount.toString().replace(/,/g, '');
        // }
        
        return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
       
        
    }
}