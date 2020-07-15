import { dispatch } from "rxjs/internal/observable/pairs";
import { authActions } from "../redux/actions/auth/auth.action";
import {history} from "../_helpers/history";
import {saveRouteForRedirect} from "../shared/utils";

import { routes } from "./urls";



const axios = require('axios');

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
        if(localStorage.getItem("user") === null){
            // if(localStorage.getItem("user") === null && axios.defaults.headers.common["Token"]){
            
            delete axios.defaults.headers.common.Authorization;
            delete axios.defaults.headers.common.Bid;
        }
        // if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
            axios.defaults.headers.common['Content-Type'] = 'application/json';
        // }
        
        
       if(localStorage.getItem("user") !==null){
           
           let user = JSON.parse(localStorage.getItem("user")),
                serviceToTest = url.split("Fintech.CBS.Backend")[1];
              
            //Exclude urlsWithoutAuthentication urls from Authenticated requests with Token
           if (urlsWithoutAuthentication.indexOf(serviceToTest) === -1 || serviceToTest==="changepassword") {
               axios.defaults.headers.common['Token'] = user.token;
            //    axios.defaults.headers.common['Authorization'] = `Bearer ddsdsdiysdij`;
               axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            //    console.log("user is", user);
                delete axios.defaults.headers.common.Bid;
                
                if (urlsWithoutBranchIdInRequest.indexOf(serviceToTest) === -1) {
                    axios.defaults.headers.common.Bid = `${parseInt(user.BranchId)}`;
                    
                }
                // else{
                //     delete axios.defaults.headers.common.Bid;

                   
                // }
               
           }
           if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
           
               axios.defaults.headers.common['Content-Type'] = 'application/json';
           }
           if (binaryUploadUrls.indexOf(serviceToTest) > -1) {
           
               axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
           }

           //Exclude urlsWithoutBranchIdInRequest urls from Authenticated requests with BranchId
           
            
            // axios.defaults.headers.common['Authorization'] = 'Bearer';
            axios.defaults.headers.common['Accept'] = 'application/json';
       }
    }

    static    refreshUserToken  (refreshTokenPayload){
        
          dispatch(authActions.ResfreshToken(refreshTokenPayload));

        

    }


    static request(url, type, data, headers = undefined, noStringify=false){
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
        serviceToTest = url.split("Fintech.CBS.Backend")[1];

        if(localStorage.getItem("user") === null){
            headers = undefined;
        }

        let lingoAuth = JSON.parse(localStorage.getItem("user"));

        if (type.toLowerCase() === 'get') {
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
           
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }

            if(lingoAuth!==null && lingoAuth!==undefined && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
                lastRefreshTime = lingoAuth.lastLogForAuth;
                currenTimestamp = Date.now();

                if(parseInt(((currenTimestamp -lastRefreshTime)/60000))>=3){ // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
                    let tempRequest = {
                        url,
                        bodyData,
                        tempHeaders: axios.defaults.headers.common
                    };

                    let refreshpayload ={
                        username:lingoAuth.userName,
                        refreshToken:lingoAuth.refreshToken
                    }
                    this.setTokenAuthorization(routes.REFRESH_TOKEN);
                    let tokenService = axios.post(routes.REFRESH_TOKEN, refreshpayload);

                    return tokenService.then(function (response) {
                        // console.log("was here")
                        if(response.status===200){
                            if(response.data.token!==undefined){
                                
                                let userData = JSON.parse(localStorage.getItem("user"));
                                    userData.lastLogForAuth = Date.now();
                                    userData.token = response.data.token;
                                    localStorage.setItem('user', JSON.stringify(userData));

                                delete axios.defaults.headers.common;
                                axios.defaults.headers.common ={
                                    ...tempRequest.tempHeaders
                                }
                                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                                service = axios.get(tempRequest.url, tempRequest.bodyData);

                                
                                return service.then((response3)=>{

                                    return service;
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
                        // console.log("logs out now",service, routes.REFRESH_TOKEN)
                        dispatch(authActions.Logout())
                        
                        
                        
                    });
                }else{
                   
                    service = axios.get(url, bodyData);
                   
                }
            }else{
                
                service = axios.get(url, bodyData);
            }

            

            return service.then(function (response) {
                // let currentRoute = window.location.pathname;
                // dispatch(authActions.Logout("unauthorized",currentRoute));
               
                // if (response.status === 200) {
                //     let currentRoute = window.location.pathname,
                //     type = "unauthorized";

                    
                    
                //     authActions.Logout(type,currentRoute);
                    
                    
                // }


                

                return service;
            }).catch(function (error) {
                if (error.response) {

                    if (error.response.status === 401) {
                        let currentRoute = window.location.pathname,
                            type = "unauthorized";
                            
                            dispatch(authActions.Logout(type,currentRoute));
                        // if((urlsToAuthenticate.indexOf(serviceToTest) === -1)){
                            
                        //     let user = JSON.parse(localStorage.getItem("user")),
                        //         refreshTokenPayload={
                        //             username: user.userName,
                        //             refreshToken: user.refreshToken
                        //           };
                                  
                        //                 let refreshService = axios.post(routes.REFRESH_TOKEN, refreshTokenPayload);
                        
                        //                 return refreshService.then(function(response) {
                                            
                        //                     if(response.status===200){
                        //                         localStorage.setItem('user', JSON.stringify(response.data));
                        //                     }
                        //                     return axios.get(url, bodyData);
                        //                 }).catch(function (error) {
                        //                     if (error.response.status === 401) {
                        //                         let currentRoute = window.location.pathname,
                        //                         type = "unauthorized";
                        //                         // console.log("routing" , currentRoute);

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
                       
                        
                    } else {
                        return service;
                    }
                      
                }
                // if(!error.response) {
                //     if(error.toString().indexOf('Network')!==-1){
                //         return "Please Check your network"
                //     }
                // }
                
                return  service;
            });

        }  
        
        if (type.toLowerCase() === 'post'){
            //check for header
            if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
               
                axios.defaults.headers.common['Content-Type'] = 'application/json';
            }
            if (binaryUploadUrls.indexOf(serviceToTest) > -1) {
                
                axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
            }
            // axios.defaults.headers.common['Content-Type'] = 'application/json';
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            
            if(lingoAuth!==null && lingoAuth!==undefined && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
                lastRefreshTime = lingoAuth.lastLogForAuth;
                currenTimestamp = Date.now();

                if(parseInt(((currenTimestamp -lastRefreshTime)/60000))>=3){ // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
                    let tempRequest = {
                        url,
                        bodyData,
                        tempHeaders: axios.defaults.headers.common
                    };

                    let refreshpayload ={
                        username:lingoAuth.userName,
                        refreshToken:lingoAuth.refreshToken
                    }
                    this.setTokenAuthorization(routes.REFRESH_TOKEN);
                    let tokenService = axios.post(routes.REFRESH_TOKEN, refreshpayload);

                    return tokenService.then(function (response) {
                        // console.log("was here")
                        if(response.status===200){
                            if(response.data.token!==undefined){
                                
                                let userData = JSON.parse(localStorage.getItem("user"));
                                    userData.lastLogForAuth = Date.now();
                                    userData.token = response.data.token;
                                    localStorage.setItem('user', JSON.stringify(userData));

                                delete axios.defaults.headers.common;
                                axios.defaults.headers.common ={
                                    ...tempRequest.tempHeaders
                                }
                                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                                service = axios.get(tempRequest.url, tempRequest.bodyData);

                                
                                return service.then((response3)=>{

                                    return service;
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
                        // console.log("logs out now",service, routes.REFRESH_TOKEN)
                        dispatch(authActions.Logout())
                        
                        
                        
                    });
                }else{
                   
                    service = axios.post(url, bodyData);
                   
                }
            }else{
                
                service = axios.post(url, bodyData);
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
                            
                        //     let user = JSON.parse(localStorage.getItem("user")),
                        //         refreshTokenPayload={
                        //             username: user.userName,
                        //             refreshToken: user.refreshToken
                        //           };
                                  
                        //                 let refreshService = axios.post(routes.REFRESH_TOKEN, refreshTokenPayload);
                        
                        //                 return refreshService.then(function(response) {
                                            
                        //                     if(response.status===200){
                        //                         localStorage.setItem('user', JSON.stringify(response.data));
                        //                     }
                        //                     return axios.get(url, bodyData);
                        //                 }).catch(function (error) {
                        //                     if (error.response.status === 401) {
                        //                         let currentRoute = window.location.pathname,
                        //                         type = "unauthorized";
                        //                         // console.log("routing" , currentRoute);

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
                    }else {
                        
                        return service;
                    }
            } 
            // if(!error.response) {
            //     // let errorm = {...error};
            //     console.log("error is", error.toString());
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