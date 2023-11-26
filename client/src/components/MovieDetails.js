

import React, {useState, useEffect, useRef, useContext} from 'react';
import { useNavigate, useParams} from "react-router-dom"; 
import {axiosGetRequest} from '../services/api_service'
import {formatCurrency} from '../services/utils'


const MovieDetails = ({updateMessage}) => {
    const {id : movieId} = useParams();
    const [movieInfo, setMovieInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false) 
    const runRef = useRef(false);  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieInfo = async () => { 
          const api_endpoint_url = `/movies/${movieId}`
          try {
    
               const response = await axiosGetRequest(api_endpoint_url)
               console.log("FE MovieDetails API Response: ", response.data, response.status)
               const data = response.data.data  
               updateMessage(`Found:  ${data.title}`)         
               setMovieInfo(data)
               setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch movie info", error, )
               updateMessage(`ERROR ${error.response.data.message}`)
               navigate("/")             
          }
        }
        
        return () => {
        //run only once
        if (!runRef.current) {
            setIsLoading(true)
            fetchMovieInfo()     
        }
        
        runRef.current = true;                      
        }

    }, []) 

    
    const renderMovieInfo = (movieInfo) => {
        return (
            <div> 
                <div> Title: {movieInfo.title}</div>
                <div> Year: {movieInfo.release_year}</div>
                <div> Global Box Office: {formatCurrency(movieInfo.global_box_office, '$')}</div>
                <div> Synopsis: {movieInfo.synopsis}</div>
            </div>
        )
    }


    return (
        <div className="page-outer"> 
            <div className="page-header">Movie Info</div>
            {(!isLoading && movieInfo ) &&
                <div>
                    <div>{renderMovieInfo(movieInfo)}</div>

                </div>
            }
            

        </div>
    )
}

export default MovieDetails


// <div>{JSON.stringify(movieInfo)}</div>