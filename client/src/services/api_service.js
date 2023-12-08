import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const axiosGetRequest = async (requestURL, queryParams={}) => {


    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL
    //console.log(`Axios calling ${fullURL}`)

    const getConfig = {    
        params: queryParams,
        withCredentials: true
      }


    // axios.interceptors.request.use(
    //     config => {
    //         // if you want to pass token in headers instead of cookies
    //         // const token = sessionStorage.getItem('sessionToken');
    //         // if (token) {
    //         //     config.headers['Authorization'] = 'Bearer ' + token;
    //         // }
    //         config.headers['Content-Type'] = 'application/json';
    //         return config;
    //     },
    //     error => {
    //         Promise.reject(error)
    // });

    try {
        const response = await axios.get(fullURL, getConfig)
        return response
    } catch(error){
        //console.log("AXIOS GET ERR: "+error)        
        return Promise.reject(error)
    }   
}

const axiosPostRequest = async (requestURL, payload={}) => {
    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL


    const postConfig = {    
        headers: {
            'Content-Type': 'application/json'
        }, 

        // withCredentials: true,
      }

    const response = await axios.post(fullURL, payload, postConfig)
    return response

}


const openAIPromptRequest = async (prompt="") => {
    const url= 'https://api.openai.com/v1/chat/completions'

    const openAIAPIKey= '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'


    const payload= {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt            }
        ]
    }


    const postConfig = {    
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + openAIAPIKey
        }, 

      }

    const response = await axios.post(url, payload, postConfig)
    return response

}



export {axiosPostRequest, axiosGetRequest, openAIPromptRequest}