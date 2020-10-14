import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from './../../../_helpers/history';
import {clientsConstants} from '../../actiontypes/clients/clients.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const clientsActions = {
    getClients,
    exportClients,
    createClient,
    getAllClients,
    getAClient,
    updateAClient,
    getAClientComments,
    creatAClientComment,
    getAClientAttachments,
    creatAClientAttachment,
    getAClientCommunications,
    changeClientState,
    getAClientActivities,
    getAClientTask,
    createClientTask,
    getDownload
}

function getClients  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_CLIENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_CLIENTS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_CLIENTS_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_CLIENTS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_CLIENTS_FAILURE, error } }

}

function exportClients  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`/clientsexport?${params}`, "GET", '','','', "blob");
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'template.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                // console.log("shkddsd")
                dispatch(success(response));
            }).catch(error =>{
               
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.EXPORT_CLIENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.EXPORT_CLIENTS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.EXPORT_CLIENTS_PENDING, user } }
    function success(response) { return { type: clientsConstants.EXPORT_CLIENTS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.EXPORT_CLIENTS_FAILURE, error } }

}

function getAllClients  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`/all?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: clientsConstants.GET_ALL_CLIENTS_PENDING, user } }
function success(response) { return { type: clientsConstants.GET_ALL_CLIENTS_SUCCESS, response } }
function failure(error) { return { type: clientsConstants.GET_ALL_CLIENTS_FAILURE, error } }

}

function getAClient  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_CLIENTS+`/${encodedKey}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }
    

    function request(user) { return { type: clientsConstants.GET_A_CLIENT_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_FAILURE, error } }
    function clear() { return { type: clientsConstants.GET_A_CLIENT_RESET, clear_data:""} }
}


function createClient   (createClientPayload){
    if(createClientPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_CLIENTS;
            let consume = ApiService.request(url, "POST", createClientPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));

                    setTimeout(() => {
                        history.push(`/customer/${response.data.result.encodedKey}`);
                    }, 2500);
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.CREATE_A_CLIENT_PENDING, user } }
    function success(response) { return { type: clientsConstants.CREATE_A_CLIENT_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.CREATE_A_CLIENT_FAILURE, error } }
    function clear() { return { type: clientsConstants.CREATE_A_CLIENT_RESET, clear_data:""} }

}


function updateAClient   (updateUserPayload){
    if(updateUserPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_CLIENTS+`/${updateUserPayload.encodedKey}`;
            delete updateUserPayload.encodedKey;
            let consume = ApiService.request(url, "POST", updateUserPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                    setTimeout(() => {
                        history.push(`/customer/${updateUserPayload.encodedKey}`);
                    }, 2500);
                    
                    
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.UPDATE_A_CLIENT_PENDING, user } }
    function success(response) { return { type: clientsConstants.UPDATE_A_CLIENT_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.UPDATE_A_CLIENT_FAILURE, error } }
    function clear() { return { type: clientsConstants.UPDATE_A_CLIENT_RESET, clear_data:""} }

}


function getAClientComments  (clientEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`/comments?ClientEncodedKey=${clientEncodedKey}&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_A_CLIENT_COMMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_A_CLIENT_COMMENTS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_A_CLIENT_COMMENTS_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_COMMENTS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_COMMENTS_FAILURE, error } }

}

function creatAClientComment   (createClientCommentPayload){
    if(createClientCommentPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_CLIENTS+`/addcomment`;
            delete createClientCommentPayload.encodedKey;
            let consume = ApiService.request(url, "POST", createClientCommentPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.CREATE_A_CLIENT_COMMENT_PENDING, user } }
    function success(response) { return { type: clientsConstants.CREATE_A_CLIENT_COMMENT_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.CREATE_A_CLIENT_COMMENT_FAILURE, error } }
    function clear() { return { type: clientsConstants.CREATE_A_CLIENT_COMMENT_RESET, clear_data:""} }

}

function getAClientAttachments  (clientEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`/attachments?ClientEncodedKey=${clientEncodedKey}&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_ATTACHMENTS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_ATTACHMENTS_FAILURE, error } }

}

function creatAClientAttachment   (createClientAttachmentPayload){
    if(createClientAttachmentPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_CLIENTS+`/addattachment`;
            delete createClientAttachmentPayload.encodedKey;
            let consume = ApiService.request(url, "POST", createClientAttachmentPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_PENDING, user } }
    function success(response) { return { type: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_FAILURE, error } }
    function clear() { return { type: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_RESET, clear_data:""} }

}

function getAClientCommunications  (clientEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`/communications?ClientEncodedKey=${clientEncodedKey}&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_FAILURE, error } }

}

function changeClientState   (newClientStatePayload, newState){
    if(newClientStatePayload!=="CLEAR"){
        return dispatch =>{
            // let url;
            // let consume;
            // if(newState==="undoblacklist" || newState==="rejectcustomer"){
            //     let payloadToSend = {
            //         clientEncodedKey : newClientStatePayload.ClientEncodedKey,
            //         comment: newClientStatePayload.Comment
            //     }
            //     url = routes.HIT_CLIENT_STATE+`/${newState}`;
                
            //     consume = ApiService.request(url, "POST", newClientStatePayload);

            // }else{
            //     let newClientStatePayloadQuery = `Comment=${newClientStatePayload.Comment}&ClientEncodedKey=${newClientStatePayload.ClientEncodedKey}`;
            //     url = routes.HIT_CLIENT_STATE+`/${newState}?${newClientStatePayloadQuery}`;

            //     consume = ApiService.request(url, "POST", null);
            // }
             let url = routes.HIT_CLIENT_STATE+`/${newState}`,
                
                consume = ApiService.request(url, "POST", newClientStatePayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.CHANGE_CLIENT_STATE_PENDING, user } }
    function success(response) { return { type: clientsConstants.CHANGE_CLIENT_STATE_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.CHANGE_CLIENT_STATE_FAILURE, error } }
    function clear() { return { type: clientsConstants.CHANGE_CLIENT_STATE_RESET, clear_data:""} }

}

function getAClientActivities  (clientEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_ACTIVITIES+`/client/${clientEncodedKey}?&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE, error } }

}

function getAClientTask  (ClientEncodedKey,params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_TASKS+`?ClientEncodedKey=${ClientEncodedKey}&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: clientsConstants.GET_A_CLIENT_TASKS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: clientsConstants.GET_A_CLIENT_TASKS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: clientsConstants.GET_A_CLIENT_TASKS_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_CLIENT_TASKS_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_CLIENT_TASKS_FAILURE, error } }

}

function createClientTask   (newClientTaskParams){
    if(newClientTaskParams!=="CLEAR"){
        return dispatch =>{
            
                let url = routes.HIT_TASKS+`/newTask`,

                consume = ApiService.request(url, "POST", newClientTaskParams);
            
             
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: clientsConstants.CREATE_A_CLIENT_TASK_PENDING, user } }
    function success(response) { return { type: clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.CREATE_A_CLIENT_TASK_FAILURE, error } }
    function clear() { return { type: clientsConstants.CREATE_A_CLIENT_TASK_RESET, clear_data:""} }

}

function getDownload  (filetype,identifier){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.GET_DOWNLOAD+`filetype=${filetype}&identifier=${identifier}&link=treble`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    
        

    function request(user) { return { type: clientsConstants.GET_A_DOWNLOAD_PENDING, user } }
    function success(response) { return { type: clientsConstants.GET_A_DOWNLOAD_SUCCESS, response } }
    function failure(error) { return { type: clientsConstants.GET_A_DOWNLOAD_FAILURE, error } }

}
