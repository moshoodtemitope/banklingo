export const handleRequestErrors = (error)=>{
    if(typeof error ==="Object"){
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