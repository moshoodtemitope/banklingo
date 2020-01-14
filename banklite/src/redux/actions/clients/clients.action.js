import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {clientsConstants} from '../../actiontypes/clients/clients.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const clientsActions = {
    getClients,
    createClient,
    getAllClients,
    getAClient,
    updateAClient
}

function getClients  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CLIENTS+`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: clientsConstants.GET_CLIENTS_PENDING, user } }
function success(response) { return { type: clientsConstants.GET_CLIENTS_SUCCESS, response } }
function failure(error) { return { type: clientsConstants.GET_CLIENTS_FAILURE, error } }

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
    

function request(user) { return { type: clientsConstants.GET_A_CLIENT_PENDING, user } }
function success(response) { return { type: clientsConstants.GET_A_CLIENT_SUCCESS, response } }
function failure(error) { return { type: clientsConstants.GET_A_CLIENT_FAILURE, error } }

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

