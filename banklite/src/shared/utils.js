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