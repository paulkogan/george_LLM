

import React, {useState, useEffect, useContext} from 'react';
import {
    Link, 
    useNavigate
  } from "react-router-dom"
import {axiosGetRequest} from '../services/api_service'

const MoviesList = () => {
    const [moviesList, setMoviesList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)  // we may not need React table
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
          
        //   if (dataFetchedRef.current) {
        //     setIsLoading(false)
        //     return; //flag to stop multiple loads with strict mode
        //   }
    
          const api_endpoint_url = `/movies`
          const api_params = {'page':pageIndex}

          try {
    
               const response = await axiosGetRequest(api_endpoint_url, api_params)
    
               const data = response.data.data           
               //dataFetchedRef.current = true; //controlled load
               //console.log("AXIOS Orders RESPONSE.data: ", data)
               setMoviesList(data)
               setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch movies data", error)
               //sessionStorage.setItem("lastPage", "/orders")
               navigate("/")
       
               
          }
        }

        return () => {
            // //console.log(`in Orders- runRef is ${runRef.current}`)
            // if (!runRef.current) {
              setIsLoading(true)
              fetchMovies()
            //}
            
            //runRef.current = true;                      
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
        <div className="page-outer"> 
            <div className="page-header">Movies List</div>
            <div>{renderMovieList(moviesList)}</div>

        </div>

    )


}

export default MoviesList


