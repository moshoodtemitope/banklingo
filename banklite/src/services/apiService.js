// import { dispatch } from "rxjs/internal/observable/pairs";

const axios = require('axios');

export class ApiService {

    state = {
        redirect: false
    };

    static request(url, type, data, headers = undefined, noStringify=false){
        let bodyData;
        let service;
        bodyData = noStringify ? JSON.stringify(data) : data;

        if(localStorage.getItem("user") === null){
            headers = undefined;
        }

        if (type.toLowerCase() === 'get') {
            if(headers === undefined){
                if(localStorage.getItem("user") === null){
                    delete axios.defaults.headers.common.Authorization;
                }
                axios.defaults.headers.common['Content-Type'] = 'application/json';
               
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
                if(localStorage.getItem("user") == null){
                    delete axios.defaults.headers.common.Authorization;
                }
                axios.defaults.headers.common['Content-Type'] = 'application/json';
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
            if(!error.response) {
                if(error.indexOf('Network')!==-1){
                    return "Please Check your network"
                }
                
            }
            return  service;
            });
        }
    }


}