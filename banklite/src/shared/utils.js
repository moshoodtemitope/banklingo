export const handleRequestErrors = (error)=>{
    console.log('error keys', Object.keys(error));
    if(error.message){
        if(error.message==='Request failed with status code 400'){
            return "An error occured. Please try again";
        }
        return error.message;
    }

    return "Something went wrong. Please try again";
}