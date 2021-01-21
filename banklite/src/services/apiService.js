import { dispatch } from "rxjs/internal/observable/pairs";
import { authActions } from "../redux/actions/auth/auth.action";
import {history} from "../_helpers/history";
import {saveRouteForRedirect} from "../shared/utils";

import { routes } from "./urls";



const axios = require('axios');



const instance = axios.create({
    validateStatus: function (status)
    {
        // return (status >= 200 && status <210);
        return (status >= 200 && status <210);
    }
});

let cancelToken;

export class ApiService {

    state = {
        redirect: false
    };


    static setTokenAuthorization = (url)=>{
        let urlsWithoutAuthentication = [
                "api/Login"
            ],
            urlsWithoutBranchIdInRequest = [
                "/api/branch/allowedbranches"
            ],
            binaryUploadUrls =[
                "/api/Upload"
            ];
        if(localStorage.getItem('lingoAuth') === null){
            // if(localStorage.getItem('lingoAuth' === null && axios.defaults.headers.common["Token"]){
            
            delete instance.defaults.headers.common.Authorization;
            delete instance.defaults.headers.common.Bid;
            delete instance.defaults.headers.common.Token;
        }
        // if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
            instance.defaults.headers.common['Content-Type'] = 'application/json';
        // }
        
        
       if(localStorage.getItem('lingoAuth') !==null){
           
           let user = JSON.parse(localStorage.getItem('lingoAuth')),
                serviceToTest = url.split("Fintech.CBS.Backend")[1];
              
            //Exclude urlsWithoutAuthentication urls from Authenticated requests with Token
           if (urlsWithoutAuthentication.indexOf(serviceToTest) === -1 || serviceToTest==="changepassword") {
               instance.defaults.headers.common['Token'] = user.token;
            //    instance.defaults.headers.common['Authorization'] = `Bearer ddsdsdiysdij`;
               instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            
                delete instance.defaults.headers.common.Bid;
                
                if (urlsWithoutBranchIdInRequest.indexOf(serviceToTest) === -1) {
                    instance.defaults.headers.common.Bid = `${parseInt(user.BranchId)}`;
                    
                }
                // else{
                //     delete instance.defaults.headers.common.Bid;

                   
                // }
               
           }
           if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
           
               instance.defaults.headers.common['Content-Type'] = 'application/json';
           }
           if (binaryUploadUrls.indexOf(serviceToTest) > -1) {
           
               instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
           }

           //Exclude urlsWithoutBranchIdInRequest urls from Authenticated requests with BranchId
           
            
            // instance.defaults.headers.common['Authorization'] = 'Bearer';
            instance.defaults.headers.common['Accept'] = 'application/json';
       }
    }

    static    refreshUserToken  (refreshTokenPayload){
        
          dispatch(authActions.ResfreshToken(refreshTokenPayload));

        

    }


    static request(url, type, data, headers = undefined, noStringify=false, responseType){
        let bodyData;
        let service,
            lastRefreshTime,
            currenTimestamp;
        bodyData = noStringify ? JSON.stringify(data) : data;

        let urlsToAuthenticate = [
            "api/Login",
            // "api/Login/refreshtoken",
        ],
        urlsWithoutBranchIdInRequest = [
            "/api/branch/allowedbranches"
        ],
        binaryUploadUrls =[
            "/api/Upload"
        ],
        skipTokenRefreshForUrls =[
            "/api/Login/refreshtoken",
            "api/Login",
        ],
        globalSearch ="Search/items?SearchText",
        serviceToTest = url.split("Fintech.CBS.Backend")[1];

        if(localStorage.getItem('lingoAuth' === null)){
            headers = undefined;
        }

        let lingoAuth = JSON.parse(localStorage.getItem('lingoAuth'));

        if (type.toLowerCase() === 'get') {
            
            
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
           
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    instance.defaults.headers.common[key] = value;
                }
            }
            let serviceResponse ="",
                serviceResponse2 ="";
            
                if(url.indexOf(globalSearch)>-1){
                   
                    if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel("Operation canceled due to new request.");
                    }
                    cancelToken = axios.CancelToken.source();
                }
            if(lingoAuth!==null && lingoAuth!==undefined && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
                lastRefreshTime = lingoAuth.lastLogForAuth;
                currenTimestamp = Date.now();


                
                if(parseInt(((currenTimestamp -lastRefreshTime)/60000))>=3){ // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
                    let tempRequest = {
                        url,
                        bodyData,
                        tempHeaders: instance.defaults.headers.common
                    };

                    let refreshpayload ={
                        username:lingoAuth.userName,
                        refreshToken:lingoAuth.refreshToken
                    }
                    this.setTokenAuthorization(routes.REFRESH_TOKEN);
                    let tokenService = instance.post(routes.REFRESH_TOKEN, refreshpayload);
                        
                    return tokenService.then(function (response) {
                        
                        if(response.status>=200 && response.status<210){
                            if(response.data.token!==undefined){
                                
                                let userData = JSON.parse(localStorage.getItem('lingoAuth'));
                                    userData.lastLogForAuth = Date.now();
                                    userData.token = response.data.token;
                                    localStorage.setItem('lingoAuth', JSON.stringify(userData));

                                delete instance.defaults.headers.common;
                                instance.defaults.headers.common ={
                                    ...tempRequest.tempHeaders
                                }
                                // responseType
                                instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                                if(responseType ===undefined){
                                    
                                    if(url.indexOf(globalSearch)>-1){
                            
                                        service = instance.get(tempRequest.url,  { cancelToken: cancelToken.token });
                                    }else{
                                        service = instance.get(tempRequest.url, tempRequest.bodyData);
                                    }
                                }
                                if(responseType ==="blob"){
                                    service = instance.request({url:tempRequest.url, method: 'GET', data:tempRequest.bodyData, responseType: 'blob'})
                                }

                                
                                return service.then((response3)=>{

                                    if(response3.status>=200 && response3.status < 210){
                                        
                                        // return service;
                                        if(response3.headers['content-type'].indexOf('application/json')>-1 || response3.headers['content-type'].indexOf('application/octet-stream')>-1){
                                            // return response3;
                                            return service;
                                            
                                        }else{
                                            // serviceResponse = "An error occured";
                                            serviceResponse = Promise.reject(response3);
                                            return serviceResponse;
                                        }

                                        
                                    }
                                })
                                .catch((error2)=>{
                                    // serviceResponse = service;
                                    
                                    // return service;
                                    
                                    if(serviceResponse!==""){
                                        return serviceResponse
                                    }else{
                                        
                                        serviceResponse2 = service;
                                        return service;
                                    }
                                    
                                })
                            }
                        }else{
                            // return service;
                            
                            dispatch(authActions.Logout())
                        }

                        
                        

                       
                    }).catch(function (error) {
                        
                     
                        let responseData= error.response || error;
                        if(responseData.config.url.indexOf("Login/refreshtoken")>-1){
                            dispatch(authActions.Logout())
                        }else{
                            if(serviceResponse!==""){
                                return serviceResponse
                            }else if(serviceResponse2!==""){
                                return serviceResponse2
                            }
                            else{
                                return tokenService;
                            }
                        }
                        
                        
                        
                    });
                }else{
                    if(responseType ===undefined){
                        if(url.indexOf(globalSearch)>-1){
                            
                            service = instance.get(url, { cancelToken: cancelToken.token });
                        }else{
                            service = instance.get(url, bodyData);
                        }
                    }
                    if(responseType ==="blob"){
                        service = instance.request({url:url, method: 'GET', data:bodyData, responseType: 'blob'})
                    }
                    // service = instance.get(url, bodyData);
                   
                }
            }else{
                if(responseType ===undefined){
                    service = instance.get(url, bodyData);
                }
                if(responseType ==="blob"){
                    service = instance.request({url:url, method: 'GET', data:bodyData, responseType: 'blob'})
                }
                
                // service = instance.get(url, bodyData);
            }

            

            return service.then(function (response) {
                // let currentRoute = window.location.pathname;
                // dispatch(authActions.Logout("unauthorized",currentRoute));
               
                // if (response.status === 200) {
                //     let currentRoute = window.location.pathname,
                //     type = "unauthorized";

                    
                    
                //     authActions.Logout(type,currentRoute);
                    
                    
                // }

                
                
                // try{
                //     if(typeof response.data === "object"){
                //         return service;
                //     }
                // }catch{
                //     throw new Error ("An Error Occured");
                // }

                if(response.headers['content-type'].indexOf('application/json')>-1 || response.headers['content-type'].indexOf('application/octet-stream')>-1){
                    // return response;
                    return service;
                }else{
                    // serviceResponse = "An error occured";
                    serviceResponse = Promise.reject(response);
                    return serviceResponse;
                }

                
                

                
                

               
            }).catch(function (error) {
                
                if (error.response) {

                    if (error.response.status === 401) {
                        let currentRoute = window.location.pathname,
                            type = "unauthorized";
                            
                            dispatch(authActions.Logout(type,currentRoute));
                        // if((urlsToAuthenticate.indexOf(serviceToTest) === -1)){
                            
                        //     let user = JSON.parse(localStorage.getItem('lingoAuth'),
                        //         refreshTokenPayload={
                        //             username: user.userName,
                        //             refreshToken: user.refreshToken
                        //           };
                                  
                        //                 let refreshService = instance.post(routes.REFRESH_TOKEN, refreshTokenPayload);
                        
                        //                 return refreshService.then(function(response) {
                                            
                        //                     if(response.status===200){
                        //                         localStorage.setItem('lingoAuth', JSON.stringify(response.data));
                        //                     }
                        //                     return instance.get(url, bodyData);
                        //                 }).catch(function (error) {
                        //                     if (error.response.status === 401) {
                        //                         let currentRoute = window.location.pathname,
                        //                         type = "unauthorized";
                        

                        //                         // dispatch(authActions.Logout("unauthorized",currentRoute));
                        //                         // setTimeout(() => {
                        //                             dispatch(authActions.Logout(type,currentRoute));
                        //                     }
                        //                 })



                        // }else{
                        //     let currentRoute = window.location.pathname,
                        //     type = "unauthorized";
                            
                        //         dispatch(authActions.Logout(type,currentRoute));  
                        
                        // }
                       
                        
                    }else if(error.response.status === 403){
                        dispatch(authActions.ForbiddenAccess())
                    }else {
                        // return service;
                        if(serviceResponse!==""){
                           
                            return serviceResponse
                        }else{
                            
                         return service;
                        }
                    }
                      
                }
                // if(!error.response) {
                //     if(error.toString().indexOf('Network')!==-1){
                //         return "Please Check your network"
                //     }
                // }
                if(serviceResponse!==""){
                   
                    return serviceResponse
                    // return serviceResponse
                }else{
                  
                 return service;
                }
                // return  service;
            });

        }  
        
        if (type.toLowerCase() === 'post'){
            //check for header
            if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
               
                instance.defaults.headers.common['Content-Type'] = 'application/json';
            }
            if (binaryUploadUrls.indexOf(serviceToTest) > -1) {
                
                instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
            }
            // instance.defaults.headers.common['Content-Type'] = 'application/json';
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    instance.defaults.headers.common[key] = value;
                }
            }
            
            if(lingoAuth!==null && lingoAuth!==undefined && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
                lastRefreshTime = lingoAuth.lastLogForAuth;
                currenTimestamp = Date.now();

                if(parseInt(((currenTimestamp -lastRefreshTime)/60000))>=3){ // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
                    let tempRequest = {
                        url,
                        bodyData,
                        tempHeaders: instance.defaults.headers.common
                    };

                    let refreshpayload ={
                        username:lingoAuth.userName,
                        refreshToken:lingoAuth.refreshToken
                    }
                    this.setTokenAuthorization(routes.REFRESH_TOKEN);
                    let tokenService = instance.post(routes.REFRESH_TOKEN, refreshpayload);

                    return tokenService.then(function (response) {
                        
                        if(response.status>=200 && response.status<210){
                            if(response.data.token!==undefined){
                                
                                let userData = JSON.parse(localStorage.getItem('lingoAuth'));
                                    userData.lastLogForAuth = Date.now();
                                    userData.token = response.data.token;
                                    localStorage.setItem('lingoAuth', JSON.stringify(userData));

                                delete instance.defaults.headers.common;
                                instance.defaults.headers.common ={
                                    ...tempRequest.tempHeaders
                                }
                                instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                                service = instance.post(tempRequest.url, tempRequest.bodyData);

                                
                                return service.then((response3)=>{

                                    if(response3.status>=200 && response3.status < 210){
                                        
                                        return service;
                                    }
                                })
                                .catch((error2)=>{
                                    return service;
                                })
                            }
                        }else{
                            // return service;
                            
                            dispatch(authActions.Logout())
                        }

                        
                        

                       
                    }).catch(function (error) {
                        
                        // dispatch(authActions.Logout())
                        let responseData= error.response;
                        if(responseData.config.url.indexOf("Login/refreshtoken")>-1){
                            dispatch(authActions.Logout())
                        }else{
                             return tokenService;
                        }
                        
                    });
                }else{
                   
                    service = instance.post(url, bodyData);
                   
                }
            }else{
                
                service = instance.post(url, bodyData);
            }
            return service.then(function (response) {
               
                return service;
            }).catch(function (error) {
            
              if (error.response) {
                
                 if (error.response.status === 401) {

                        let currentRoute = window.location.pathname,
                            type = "unauthorized";
                            
                                dispatch(authActions.Logout(type,currentRoute));
                        // let currentRoute = window.location.pathname;
                        // dispatch(authActions.Logout("unauthorized",currentRoute));
                        // //history.push('/');

                        // if((urlsToAuthenticate.indexOf(serviceToTest) === -1)){
                            
                        //     let user = JSON.parse(localStorage.getItem('lingoAuth'),
                        //         refreshTokenPayload={
                        //             username: user.userName,
                        //             refreshToken: user.refreshToken
                        //           };
                                  
                        //                 let refreshService = instance.post(routes.REFRESH_TOKEN, refreshTokenPayload);
                        
                        //                 return refreshService.then(function(response) {
                                            
                        //                     if(response.status===200){
                        //                         localStorage.setItem('lingoAuth', JSON.stringify(response.data));
                        //                     }
                        //                     return instance.get(url, bodyData);
                        //                 }).catch(function (error) {
                        //                     if (error.response.status === 401) {
                        //                         let currentRoute = window.location.pathname,
                        //                         type = "unauthorized";
                        

                        //                         // dispatch(authActions.Logout("unauthorized",currentRoute));
                        //                         // setTimeout(() => {
                        //                             dispatch(authActions.Logout(type,currentRoute));
                        //                     }
                        //                 })



                        // }else{
                        //     let currentRoute = window.location.pathname,
                        //     type = "unauthorized";
                            
                        //         dispatch(authActions.Logout(type,currentRoute));  
                        
                        // }
                    }else if(error.response.status === 403){
                        dispatch(authActions.ForbiddenAccess())
                    }else {
                        
                        return service;
                    }
            } 
            // if(!error.response) {
            //     // let errorm = {...error};
        
            //     if(error.toString().indexOf('Network')!==-1){
            //         return "Please Check your network"
            //     }
            //     return  service;
            // }
                return  service;
            });
        }
    }


}