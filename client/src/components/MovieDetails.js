

import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams, Link} from "react-router-dom"; 
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
                <div className="movie-BO">  Global Box Office: {formatCurrency(movieInfo.global_box_office, '$')}</div>
                <div className="movie-synopsis"> Synopsis: {movieInfo.synopsis}</div>
            </div>
        )
    }

    const renderMovieRoles = (moviesRoles) => {
        // return (
        //     <div>{JSON.stringify(moviesRoles)}</div>
        // )
        if (! moviesRoles) {
            return
        } else {

            return moviesRoles.map(movieRole => {
                return (
                    // <div>
                    //     {JSON.stringify(movieRole)}
                    // </div>
                    <div key={movieRole.id} className="role-parent">
                        <div className="role-image-box">
                            {<img className="role-image" src={movieRole["roleActor"].image_url} ></img>} 
                        </div>
                        <div className="role-details-box">                    
                            <Link className="cross-link" to={`/characters/${movieRole["roleCharacter"].id}`}>{movieRole["roleCharacter"].name}</Link>
                            <div>{movieRole["roleActor"].first_name} {movieRole["roleActor"].last_name} </div>
                            {/* {(movieRole["roleCharacter"].civilian) && 
                                    <div>
                                        <div>{"/ " + movieRole["roleCharacter"].civilian} </div>                            
                                    </div> 

                            } */}


      

                
                        </div>                 
                    </div>
                )
            })
        }
    }


    return (
        <div className="page-outer"> 
            <div className="page-header">{movieInfo.title} ({movieInfo.release_year})</div>
            {(!isLoading && movieInfo ) &&
                <div>
                    <div className="movie-info">{renderMovieInfo(movieInfo)}</div>
                    <div className="roles-list">{renderMovieRoles(movieInfo["movieRoles"])}</div>

                </div>
            }
            

        </div>
    )
}

export default MovieDetails


// <div>{JSON.stringify(movieInfo)}</div>



