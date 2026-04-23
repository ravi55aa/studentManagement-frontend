import axios from 'axios';

const host=window.location.hostname;
let subdomain=host.split('.')[0]+'.';

if(subdomain=='localhost'){
  subdomain=''
}


const userType=window.location.pathname.split('/')[1];

export const axiosBaseURL = axios.create({
  baseURL: `http://${subdomain}localhost:4000`, //import.meta.env.VITE_BACKEND_URL
  withCredentials: true, //allow [cookie/sessionData]
  timeout: 15000,
  headers: {
    'contentType': 'application/json',
    'role':userType.charAt(0).toUpperCase() + userType.slice(1), //student/teacher/
  }
});

axiosBaseURL.interceptors.request.use(
  function (config) {
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosBaseURL.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (error.response?.status === 401) {
      //UnAuthorized
      window.location.href = 'login'; //go back to previous page
    }

    return Promise.reject(error);
  },
);
