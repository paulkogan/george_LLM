

import React, {useState, useEffect,  useRef} from 'react';
import {
    Link, 
    useNavigate
  } from "react-router-dom"
import {axiosGetRequest} from '../services/api_service'

const MoviesList = ({updateMessage}) => {

    const [moviesList, setMoviesList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const runRef = useRef(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies =  async () => {
          

          const api_endpoint_url = `/movies`
          const api_params = {}


          try {
    
               const response = await axiosGetRequest(api_endpoint_url, api_params)    
               const data = response.data.data 
               updateMessage(`Found ${data.length} movies`)          
               console.log("FE Movies List API Response: ", response.data, response.status)
               setMoviesList(data)
               setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch movies data", error)
               navigate("/")
       
               
          }
        }

        return () => {
            //run only once
            if (!runRef.current) {
              setIsLoading(true)
              fetchMovies()
            }
            
            runRef.current = true;                      
          }

    }, []) 
    
    const renderMovieList = (moviesList) => {
        return moviesList.map (movie => {
            return (
                <li key={Math.floor(movie.release_year*Math.random()*1000)}>
                    <Link to={`/movies/${movie.id}`}>{movie.title}{" ("+movie.release_year+")"}</Link>
                    
                </li>
            )
        })
    }


    return (
        !isLoading && 
            <div className="page-outer"> 
                <div className="page-header">Movies List</div>
                <div>{renderMovieList(moviesList)}</div>

            </div>
    )


}

export default MoviesList


