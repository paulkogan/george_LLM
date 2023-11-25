

import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams} from "react-router-dom"; 
import {axiosGetRequest} from '../services/api_service'
import {formatCurrency} from '../services/utils'


const MovieDetails = () => {
    const {id : movieId} = useParams();
    const [movieInfo, setMovieInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieInfo = async () => { 
          const api_endpoint_url = `/movies/${movieId}`
          try {
    
               const response = await axiosGetRequest(api_endpoint_url)
               const data = response.data.data           
               setMovieInfo(data)
               setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch movie info", error)
               navigate("/")             
          }
        }

        return () => {

              setIsLoading(true)
              fetchMovieInfo()              
          }

    }, []) 
    
    const renderMovieInfo = (movieInfo) => {
        return (
            <div> 
                <div> Title: {movieInfo.title}</div>
                <div> Year: {movieInfo.release_year}</div>
                <div> Global Box Office: {formatCurrency(movieInfo.global_box_office, '$')}</div>
                <div> Synosis: {movieInfo.synopsis}</div>
            </div>
        )
    }


    return (
        <div className="page-outer"> 
            <div className="page-header">Movie Info</div>
            {!isLoading &&
                <div>
                    <div>{renderMovieInfo(movieInfo)}</div>

                </div>
            }
            

        </div>
    )
}

export default MovieDetails


// <div>{JSON.stringify(movieInfo)}</div>