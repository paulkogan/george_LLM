import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


export const axiosGetRequest = async (requestURL, queryParams={}) => {


    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL
    //console.log(`Axios calling ${fullURL}`)

    const getConfig = {    
        params: queryParams,
        withCredentials: true
      }


    axios.interceptors.request.use(
        config => {
            // if you want to pass token in headers instead of cookies
            // const token = sessionStorage.getItem('sessionToken');
            // if (token) {
            //     config.headers['Authorization'] = 'Bearer ' + token;
            // }
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
    });

    try {
        const response = await axios.get(fullURL, getConfig)
        return response
    } catch(error){
        //console.log("AXIOS GET ERR: "+error)        
        return Promise.reject(error)
    }   
}

export const axiosPostRequest = async (requestURL, payload={}) => {
    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL


    const postConfig = {    
        headers: {
            'Content-Type': 'application/json',
        }, 
        withCredentials: true,
      }

    const response = await axios.post(fullURL, payload, postConfig)
    return response

}