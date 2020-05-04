export const handleRequestErrors = (error)=>{
    console.log('error type',  error.toString());
    if(error.toString().indexOf("'closed' of undefined")>-1  
        // error.toString().indexOf("code 401")>-1
    ){
        // setTimeout(() => {
            //  window.location.reload();
        // }, 1000);
       
    }
    if(error!==undefined && error!==null){
        // if(error!==undefined && error!==null && error.toString().indexOf("'closed' of undefined")===-1){
        
        if(typeof error.response ==="object"){
            // console.log('error keys', error.response);
            if(error.response && error.response.data.message!==null && error.response.data.message!==undefined){
                
                return error.response.data.message;
            }else{
                if(error.response && error.response.data.title!==null && error.response.data.title!==undefined){
                
                    return error.response.data.title;
                }
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

export const accountNumber = (accountNum, maxChars)=>{
    var reg = /^\d+$/;
    let filteredNum = accountNum.replace(/\D/g,'');
    // if(reg.test(accountNum)){
        let maxNoOfChars = (maxChars!==null && maxChars!==undefined)?parseInt(maxChars):10
        if(filteredNum.toString().length<=maxNoOfChars){
            return filteredNum;
        }else{
            return filteredNum.toString().substr(0,maxNoOfChars);
        }
    // }else{

    //     return "";
    // }
}


export const noWhiteSpaces = (value)=>{
    let filteredValue = value.trim().replace(/\s/g,'');
    // if(reg.test(accountNum)){
        return filteredValue;
        // if(filteredValue.toString().length<=1){
        //     return filteredValue;
        // }
}



export const allowNumbersOnly = (numbers, maxLength)=>{
    var reg = /^\d+$/;
    let filteredNum = numbers.replace(/\D/g,'');

    if(maxLength!==null && maxLength!==undefined && typeof maxLength ==="number" && filteredNum.toString().length>maxLength){
        filteredNum = parseInt(filteredNum.toString().substring(0,maxLength));
    }

    return filteredNum;
    // if(reg.test(numbers)){
    //     return numbers;
    // }else{

    //     return "";
    // }
}

export const numberWithoutDecimals= (amount)=> {
    // let testSequence = /^[0-9.,]+$/;
    // let testSequence = /([0-9]+(\.[0-9]+)?)/;
    
    if(amount!==null){
        if(amount!==undefined && amount!==''){
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/\D/g,'');
            
            // if(!testSequence.test(amount)){
            //     return "";
            // }
        // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});
            
            // if(amount.indexOf(',')>-1){
                amountFiltered = amount.toString().replace(/,/g, '');
            // }

            
            if((amountFiltered.match(/\./g) || []).length===1){
        
                if(amountFiltered.indexOf('.')>0){
                    splittedDecimal = amountFiltered.trim().split('.');

                    if(splittedDecimal[1].indexOf('.')>-1){
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if(splittedDecimal[0].indexOf('.')>-1){
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if(splittedDecimal[1].length>2){
                        
                        splittedDecimal[1] = splittedDecimal[1].substring(2,0);
                    }

                    // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0'){
                    //     splittedDecimal[1] = splittedDecimal[1]+'0';
                    // }
                    

                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }
            if((amountFiltered.match(/\./g) || []).length>1){

                var numberParts = amountFiltered.split('.');
                numberParts =  numberParts.slice(0,-1).join('') + '.' + numberParts.slice(-1)
                
                return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
            }

            

            return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            
        
            
        }
    }

    if(amount===null){
        return null;
    }
}

export const numberWithCommas= (amount, isDecimal)=> {
    // let testSequence = /^[0-9.,]+$/;
    // let testSequence = /([0-9]+(\.[0-9]+)?)/;
    
    if(amount!==null){
        if(amount!==undefined && amount!==''){
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/[^0-9.,]/g,'');

            // if(!testSequence.test(amount)){
            //     return "";
            // }
        // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});
            
            // if(amount.indexOf(',')>-1){
                amountFiltered = amount.toString().replace(/,/g, '');
            // }

            
            if((amountFiltered.match(/\./g) || []).length===1){
        
                if(amountFiltered.indexOf('.')>0){
                    splittedDecimal = amountFiltered.trim().split('.');

                    if(splittedDecimal[1].indexOf('.')>-1){
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if(splittedDecimal[0].indexOf('.')>-1){
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if(splittedDecimal[1].length>2){
                        
                        splittedDecimal[1] = splittedDecimal[1].substring(2,0);
                    }

                    if(splittedDecimal[1].length<2 && isDecimal===true){
                        
                        splittedDecimal[1] = splittedDecimal[1]+'0';
                    }

                    // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                    //     splittedDecimal[1] = splittedDecimal[1]+'0';
                    // }
                    

                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }
            if((amountFiltered.match(/\./g) || []).length>1){

                var numberParts = amountFiltered.split('.');
                numberParts =  numberParts.slice(0,-1).join('') + '.' + numberParts.slice(-1)
                
                return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
            }

            if(amountFiltered.indexOf('.')===-1 && isDecimal===true){
                amountFiltered = amountFiltered+'.00';
            }
            
            return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            
        
            
        }
    }

    if(amount===null){
        return null;
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
