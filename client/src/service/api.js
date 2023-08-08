import axios from 'axios';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config.js';
import {getAccessToken,getType} from '../utils/common-utils.js'

const API_URL='http://localhost:8000';
const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    header:{
        "Content-Type" : "application/json"
    }
})
axiosInstance.interceptors.request.use(
    function(config){        //config comes with params and query
        if (config.TYPE.params) {
            config.params=config.TYPE.params;
        }else if (config.TYPE.query) {
            config.url=config.url+'/'+config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        //stopping the global loader
        return processResponse(response);
    },
    function(error){
        //stopping the global loader
        return Promise.reject(processError(error));
    },
)

const processResponse=(response)=>{
    if(response?.status===200){
        return {
            isSuccess:true,
            data:response.data,  //data is object which contains all the key value of response
        }
    }else{
        return{
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
            // msg: response?.data.msg, 
            // code: response?.data.code,
            
        }
    }
}


  
const processError=(error)=>{
    if (error.response) {
        //request made but server responded with statuscode!=200
        console.log("Error in response: ",error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }else if(error.request){
        //request made but no response-REQUEST has not gone to backend
        console.log("Error in REQUEST: ",error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }else{
        //something wrong in setting up request that triggers an error
        console.log("Error in NETWORK: ",error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}



const API={};   //through this object,api will b called
for (const [key,value] of Object.entries(SERVICE_URLS)){

    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method === 'DELETE' ? {}: body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),    //params/query,music
            onUploadProgress:function(progressEvent){
                if (showUploadProgress) {  //how many percentage api has came
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if (showDownloadProgress) {
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            },
        })
    
}
export {API};