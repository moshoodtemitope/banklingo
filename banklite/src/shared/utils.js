
export const handleRequestErrors = (error)=>{
    
    if(error.toString().indexOf("'closed' of undefined") > -1 ){
        // setTimeout(() => {
            //  window.location.reload();
        // }, 1000);
       
    }

    // console.log("error text is", error);
    
    if(error!==undefined && error!==null && error!==""){
        // if(error!==undefined && error!==null && error.toString().indexOf("'closed' of undefined")===-1){
        
        if(typeof error.response ==="object"){
            
            // console.log("dsdsdsdsdsdsd---------", error.response.data)
                if(error.response && error.response.data.title!==null && error.response.data.title!==undefined 
                    && error.response.data.title.toLowerCase().indexOf('one or more validation errors occurred.') > -1){
                    
                    // return error.response.data.title;
                    
                    return modelStateErrorHandler(error);
                }else{
                    if(error.response.data.message!==null && error.response.data.message!==undefined && error.response.data.message!==""){
                        return error.response.data.message;
                    }else{
                        return "Sorry an error occured";
                        // if(error.response && error.response.data.traceMessages!==null && error.response.data.traceMessages!==undefined){
                    
                        //     return error.response.data.traceMessages;
                        // }
                    }
                    // if(error.response.data.traceMessages!==null && error.response.data.traceMessages!==undefined && error.response.data.traceMessages!==""){
                    //     return error.response.data.traceMessages;
                    // }else{
                    //     if(error.response && error.response.data.message!==null && error.response.data.message!==undefined){
                    
                    //         return error.response.data.message;
                    //     }
                    // }
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

        if(error.data && typeof error.data==="string"){
            if(error.data.indexOf("Bad Request")>-1){
                return "Something went wrong. Please try again later";
            }
        }


        
        // return error
        return 'An error occured';
    }

    
    return "Something went wrong. Please try again";
}

export const modelStateErrorHandler = (error, field) => {
    //console.log("in model state");
    //console.log(error);
    try {
        
        if (error.response) {
            if ("errors" in error.response.data && (error.response.data.title!==undefined && error.response.data.title!=="")) {
                if ("errors" in error.response.data && error.response.data.title.toLowerCase().indexOf('one or more validation errors occurred.') > -1) {
                    let message = '';
                        for (let key in error.response.data.errors) {
                            if (error.response.data.errors.hasOwnProperty(key)) {
                                // console.log(key + " -> " + error.errors[key]);
                                if (Object.keys(error.response.data.errors).length > 1) {
                                    message += error.response.data.errors[key] + "\n";
                                } else {
                                    message += error.response.data.errors[key];
                                }
                            }
                        }
                    return message;
                }else{
                    let message = '';
                }
            }
            // else {
            //     return handleError(error);
            // } //Check for the exact error code to know what to return
        }
        // else {
        //     return handleError(error);
        // }  //Check for the exact error code to know what to return
        
    } catch (err) {
       // console.log(err);
        return "Error : Something went wrong";
    }
    
}

export const handleError = (error) => {
    //console.log("-----in handle error")
    //console.log(error);
    var message = '';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status >= 500 && error.response.status < 600) {
            message = 'something went wrong, try again please.';
        } else {
            // console.log("----====", typeof error.response.data);
            message = error.response.data.message || error.response.data.Message;
        }

    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log(error.request);
        message = error.message
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        message = error.message;
    }
    return message;
};


export const getDateFromISO =(date, returnTime) =>{
    let toUse = new Date(date),
        year = toUse.getFullYear(),
        month = toUse.getMonth()+1,
        dt = toUse.getDate();
        
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }
        
      
    let convertedDate = `${dt}-${month}-${year}`;
    // let convertedDate = toUse.toUTCString().split(' ').slice(0, 4).join(' ');
    let convertedTime ='';
        if(returnTime===true && date.indexOf('T')===-1){
            convertedTime = date.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");
            return convertedTime;
        }
        if(returnTime===true && date.indexOf('T')>-1){
            convertedTime = date.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");

            let convertedDateAndTime = `${convertedDate} ${convertedTime}`;
            return convertedDateAndTime;
        }

        return convertedDate;

    // let convertedDateAndTime = `${convertedDate} ${convertedTime}`;
    // return convertedDateAndTime;
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
    if(numbers!==undefined && numbers!==null){
        var reg = /^\d+$/;
        let filteredNum = numbers.replace(/\D/g,'');

        

        // if(maxLength!==null && maxLength!==undefined && typeof maxLength ==="number" && filteredNum.toString().length>maxLength){
        //     // console.log("##",filteredNum.toString().length);
        //     filteredNum = filteredNum.toString().substring(0,maxLength);

            
        //     return filteredNum;
        // }else{
            
        //     return filteredNum;
        // }
        // else{
        //     // console.log("++",filteredNum.toString().length)
        // }

        if (typeof maxLength === "number") {
            if (filteredNum.toString().length <= maxLength) {
                return filteredNum;
            } else {
                return filteredNum.toString().substring(0, maxLength);
            }
        }else{
            return filteredNum;
        }

        
        

        
    }else{
        return null;
    }
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
            amount = amount.toString().replace(/\-\D/g,'');
            
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
    
    if (amount !== null && amount !== undefined) {
        if (amount !== '') {
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/[^0-9.,]/g, '');

            amountFiltered = amount.toString().replace(/,/g, '');



            if ((amountFiltered.match(/\./g) || []).length === 1) {

                if (amountFiltered.indexOf('.') > 0) {
                    splittedDecimal = amountFiltered.trim().split('.');

                    if (splittedDecimal[1].indexOf('.') > -1) {
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if (splittedDecimal[0].indexOf('.') > -1) {
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if (splittedDecimal[1].length > 2) {

                        splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
                    }

                    if (splittedDecimal[1].length < 2 && isDecimal === true) {

                        splittedDecimal[1] = splittedDecimal[1] + '0';
                    }

                    // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                    //     splittedDecimal[1] = splittedDecimal[1]+'0';
                    // }


                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }

            if ((amountFiltered.match(/\./g) || []).length > 1) {

                var numberParts = amountFiltered.split('.');
                numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)

                return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }

            if (amountFiltered.indexOf('.') === -1 && isDecimal === true) {
                amountFiltered = amountFiltered + '.00';
            }

            return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



        }
        if (amount === '') {
            return "";
        }
    } else {
        return null;
    }

    
    // if(amount===null){
    //     return null;
    // }
}

export const numberWithCommasA= (amount, isDecimal, isDisplay)=> {
   
    
    if (amount !== null) {
        let amountOutput;
        if (amount !== undefined && amount !== '') {
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/\-[^0-9.,]/g, '');





            amountFiltered = amount.toString().replace(/,/g, '');



            if (amount < 0) {
                amountFiltered = `${Math.abs(amountFiltered)}`
            }

            if ((amountFiltered.match(/\./g) || []).length === 1) {

                if (amountFiltered.indexOf('.') > 0) {

                    splittedDecimal = amountFiltered.trim().split('.');

                    if (splittedDecimal[1].indexOf('.') > -1) {
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if (splittedDecimal[0].indexOf('.') > -1) {
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if (splittedDecimal[1].length > 2) {

                        splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
                    }

                    if (splittedDecimal[1].length < 2 && isDecimal === true) {

                        splittedDecimal[1] = splittedDecimal[1] + '0';
                    }

                    if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                        splittedDecimal[1] = splittedDecimal[1]+'0';
                    }

                    // console.log("bloom", splittedDecimal)

                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    amountOutput = `${amountTemp}.${splittedDecimal[1]}`;
                    if (isDisplay === true) {
                        if (parseFloat(amount) < 0) {
                            amountOutput = `(${amountOutput})`
                            return amountOutput
                        }
                    } else {
                        return `${amountTemp}.${splittedDecimal[1]}`
                    }

                    return amountOutput;
                    // return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }
            if ((amountFiltered.match(/\./g) || []).length > 1) {

                var numberParts = amountFiltered.split('.');
                numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)


                amountOutput = numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                if (isDisplay === true) {
                    if (parseFloat(amount) < 0) {
                        amountOutput = `(${amountOutput})`
                        return amountOutput;
                    }
                } else {
                    return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }

                return amountOutput;
                // return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
            }

            if (amountFiltered.indexOf('.') === -1 && isDecimal === true) {

                amountFiltered = amountFiltered + '.00';
            }



            amountOutput = amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            if (isDisplay === true) {

                if (parseFloat(amount) < 0) {
                    amountOutput = `(${amountOutput})`
                    return amountOutput;
                }
            } else {
                return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }

            return amountOutput;

            // return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



        }
    }

    if (amount === null) {
        return null;
    }
}

export const numberWithCommasW= (amount, isDecimal, isDisplay)=> {
   
    
    if (amount !== null) {
        let amountOutput;
        if (amount !== undefined && amount !== '') {
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/\-[^0-9.,]/g, '');





            amountFiltered = amount.toString().replace(/,/g, '');



            if (amount < 0) {
                amountFiltered = `${Math.abs(amountFiltered)}`
            }

            if ((amountFiltered.match(/\./g) || []).length === 1) {

                if (amountFiltered.indexOf('.') > 0) {

                    splittedDecimal = amountFiltered.trim().split('.');

                    if (splittedDecimal[1].indexOf('.') > -1) {
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if (splittedDecimal[0].indexOf('.') > -1) {
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if (splittedDecimal[1].length > 2) {

                        splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
                    }

                    if (splittedDecimal[1].length < 2 && isDecimal === true) {

                        splittedDecimal[1] = splittedDecimal[1] + '0';
                    }

                    if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                        splittedDecimal[1] = splittedDecimal[1]+'0';
                    }

                    // console.log("bloom", splittedDecimal)

                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    amountOutput = `${amountTemp}.${splittedDecimal[1]}`;
                    if (isDisplay === true) {
                        if (parseFloat(amount) < 0) {
                            amountOutput = `(${amountOutput})`
                            return amountOutput
                        }
                    } else {
                        return `${amountTemp}.${splittedDecimal[1]}`
                    }

                    return amountOutput;
                    // return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }
            if ((amountFiltered.match(/\./g) || []).length > 1) {

                var numberParts = amountFiltered.split('.');
                numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)


                amountOutput = numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                if (isDisplay === true) {
                    if (parseFloat(amount) < 0) {
                        amountOutput = `(${amountOutput})`
                        return amountOutput;
                    }
                } else {
                    return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }

                return amountOutput;
                // return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
            }

            if (amountFiltered.indexOf('.') === -1 && isDecimal === true) {

                amountFiltered = amountFiltered + '.00';
            }



            amountOutput = amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            if (isDisplay === true) {

                if (parseFloat(amount) < 0) {
                    amountOutput = `(${amountOutput})`
                    return amountOutput;
                }
            } else {
                return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }

            return amountOutput;

            // return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



        }
    }

    if (amount === null) {
        return null;
    }
}

export const numberWithCommasT = (amount, isDecimal, isDisplay)=> {
   
    
    if (amount !== null) {
        let amountOutput;
        if (amount !== undefined && amount !== '') {
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/\-[^0-9.,]/g, '');





            amountFiltered = amount.toString().replace(/,/g, '');



            if (amount < 0) {
                amountFiltered = `${Math.abs(amountFiltered)}`
            }

            if ((amountFiltered.match(/\./g) || []).length === 1) {

                if (amountFiltered.indexOf('.') > 0) {

                    splittedDecimal = amountFiltered.trim().split('.');

                    if (splittedDecimal[1].indexOf('.') > -1) {
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if (splittedDecimal[0].indexOf('.') > -1) {
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if (splittedDecimal[1].length > 2) {

                        splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
                    }

                    if (splittedDecimal[1].length < 2 && isDecimal === true) {

                        splittedDecimal[1] = splittedDecimal[1] + '0';
                    }

                    // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                    //     splittedDecimal[1] = splittedDecimal[1]+'0';
                    // }

                    // console.log("bloom", splittedDecimal)

                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    amountOutput = `${amountTemp}.${splittedDecimal[1]}`;
                    if (isDisplay === true) {
                        if (parseFloat(amount) < 0) {
                            amountOutput = `(${amountOutput})`
                            return amountOutput
                        }
                    } else {
                        return `${amountTemp}.${splittedDecimal[1]}`
                    }

                    return amountOutput;
                    // return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }
            if ((amountFiltered.match(/\./g) || []).length > 1) {

                var numberParts = amountFiltered.split('.');
                numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)


                amountOutput = numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                // if (isDisplay === true) {
                //     if (parseFloat(amount) < 0) {
                //         amountOutput = `(${amountOutput})`
                //         return amountOutput;
                //     }
                // } else {
                    return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                // }

                // return amountOutput;
                // return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
            }

            if (amountFiltered.indexOf('.') === -1 && isDecimal === true) {

                amountFiltered = amountFiltered + '.00';
            }



            amountOutput = amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            // if (isDisplay === true) {

            //     if (parseFloat(amount) < 0) {
            //         amountOutput = `(${amountOutput})`
            //         return amountOutput;
            //     }
            // } else {
                return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            // }

            // return amountOutput;

            // return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



        }
    }

    if (amount === null) {
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
