export const handleRequestErrors = (error)=>{
    console.log('error type',  error, typeof error);
    if(error.toString().indexOf("'closed' of undefined")>-1){
        // window.location.reload();
    }
    if(error!==undefined && error!==null){
        // if(error!==undefined && error!==null && error.toString().indexOf("'closed' of undefined")===-1){
        
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
           
            return "Something went wrong. Please try again";
        }

        if(error.toString()==="Error: Network Error"){
            return "Please check your network and try again"
        }
        
        // return error
        return '';
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
    let filteredNum = accountNum.replace(/\D/g,'');
    // if(reg.test(accountNum)){
        if(filteredNum.toString().length<=10){
            return filteredNum;
        }else{
            return filteredNum.toString().substr(0,10);
        }
    // }else{

    //     return "";
    // }
}

export const allowNumbersOnly = (numbers)=>{
    var reg = /^\d+$/;
    let filteredNum = numbers.replace(/\D/g,'');
    return filteredNum;
    // if(reg.test(numbers)){
    //     return numbers;
    // }else{

    //     return "";
    // }
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
    // localStorage.setItem('currentRoute', currentRoute);
    localStorage.setItem('redirectType', JSON.stringify(redirectType));
    // localStorage.setItem('redirectType', redirectType);
}

export const removeRouteForRedirect = ()=>{
    
    localStorage.removeItem("currentRoute");
    localStorage.removeItem("redirectType");
}

export const getRouteForRedirect = ()=>{

    let getPreviousRoute = JSON.parse(localStorage.getItem("currentRoute"));
    let redirectType = JSON.parse(localStorage.getItem("redirectType"));

    // let getPreviousRoute = localStorage.getItem("currentRoute");
    // let redirectType = localStorage.getItem("redirectType");

    if(getPreviousRoute!==undefined){
        return {getPreviousRoute,redirectType };
    }else{
        return null
    }
    
}
