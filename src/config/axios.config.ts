
import axios from "axios";

export const axiosBaseURL=axios.create(
    {
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true, //allow [cookie/sessionData]
    timeout:15000,
    headers:{
    "ContentType":"application/json"
    }
    }
);

axiosBaseURL.interceptors.request.use(
    function(config){
    return config;
    },

    function (error){
    return Promise.reject(error);
    }
)

axiosBaseURL.interceptors.response.use(
    function (response) {
    return response;
    },

    async function (error) {
    if(error.response.status===401){ //UnAuthorized
    window.location.href = "/login";
    }

    return Promise.reject(error);
    }
);