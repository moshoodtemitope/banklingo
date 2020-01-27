export const handleRequestErrors = (error)=>{
    console.log('error type',  error)
    if(error!==undefined && error!==null){
        // if(error!==undefined && error!==null && error.toString().indexOf("'closed' of undefined")===-1){
        console.log("before");
        if(typeof error.response ==="object"){
            // console.log('error keys', error.response);
            if(error.response && error.response.data.message!==null){
                console.log("=====center====");
                return error.response.data.message;
            }
            // if(error.message){
            //     if(error.message==='Request failed with status code 400'){
            //         return "An error occured. Please try again";
            //     }
            //     return error.message;
            // }
            // console.log('final');
            console.log("middle");
            return "Something went wrong. Please try again";
        }

        if(error.toString()==="Error: Network Error"){
            return "Please check your network and try again"
        }
        console.log("after");
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

export const saveRouteForRedirect = (redirectType,currentRoute)=>{
    
    localStorage.setItem('currentRoute', JSON.stringify(currentRoute));
    localStorage.setItem('redirectType', JSON.stringify(redirectType));
}

export const removeRouteForRedirect = ()=>{
    
    localStorage.removeItem("currentRoute");
    localStorage.removeItem("redirectType");
}

export const getRouteForRedirect = ()=>{

    let getPreviousRoute = JSON.parse(localStorage.getItem("currentRoute"));
    let redirectType = JSON.parse(localStorage.getItem("redirectType"));
    if(getPreviousRoute!==undefined){
        return {getPreviousRoute,redirectType };
    }else{
        return null
    }
    
}
