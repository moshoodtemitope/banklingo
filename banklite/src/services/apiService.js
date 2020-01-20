// import { dispatch } from "rxjs/internal/observable/pairs";

const axios = require('axios');

export class ApiService {

    state = {
        redirect: false
    };


    static setTokenAuthorization = (url)=>{
        let urlsToAuthenticate = [
                "api/Login"
            ],
            urlsWithoutBranchIdInRequest = [
                "/api/branch/allowedbranches"
            ];
        if(localStorage.getItem("user") === null){
            // if(localStorage.getItem("user") === null && axios.defaults.headers.common["Token"]){
            
            delete axios.defaults.headers.common.Authorization;
            delete axios.defaults.headers.common.Bid;
        }
        axios.defaults.headers.common['Content-Type'] = 'application/json';
       if(localStorage.getItem("user") !==null){
           
           let user = JSON.parse(localStorage.getItem("user")),
                serviceToTest = url.split("Dars.Administration")[1];
              
            //Exclude urlsToAuthenticate urls from Authenticated requests with Token
           if (urlsToAuthenticate.indexOf(serviceToTest) === -1) {
               // axios.defaults.headers.common['Token'] = user.token;
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

           //Exclude urlsWithoutBranchIdInRequest urls from Authenticated requests with BranchId
           
            
            // axios.defaults.headers.common['Authorization'] = 'Bearer';
            axios.defaults.headers.common['Accept'] = 'application/json';
       }
    }


    static request(url, type, data, headers = undefined, noStringify=false){
        let bodyData;
        let service;
        bodyData = noStringify ? JSON.stringify(data) : data;

        if(localStorage.getItem("user") === null){
            headers = undefined;
        }

        if (type.toLowerCase() === 'get') {
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
           
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            service = axios.get(url, bodyData);
            return service.then(function (response) {
                return service;
            }).catch(function (error) {
                if (error.response) {
                    console.log("errors is", error.response.status);
                    if (error.response.status === 401) {
                        // dispatch(userActions.logout());
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

        } else {
            //check for header
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            if(headers === undefined){
                this.setTokenAuthorization(url);
            }
            else if(headers !== undefined){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            
            service = axios.post(url, bodyData);
            return service.then(function (response) {
               
                return service;
            }).catch(function (error) {
            
              if (error.response) {
                
                 if (error.response.status === 401) {
                        // dispatch(userActions.logout());
                        //history.push('/');
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