

import React, {useState, useEffect,  useRef} from 'react';
import {
    Link, 
    useNavigate
  } from "react-router-dom"
import {axiosGetRequest} from '../services/api_service'

const CharactersList = ({updateMessage}) => {

    const [charactersList, setcharactersList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const runRef = useRef(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchcharacters =  async () => {
          
          const api_endpoint_url = `/characters`
          const api_params = {}
          try {
    
               const response = await axiosGetRequest(api_endpoint_url, api_params)    
               const data = response.data.data 
               updateMessage(`Found ${data.length} characters`)          
               // console.log("FE characters List API Response: ", response.data, response.status)
               setcharactersList(data)
               setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch characters data", error)
               navigate("/")
       
               
          }
        }

        return () => {
            //run only once
            if (!runRef.current) {
              setIsLoading(true)
              fetchcharacters()
            }
            
            runRef.current = true;                      
          }

    }, []) 


    
    const renderCharacterList = (charactersList) => {
        return charactersList.map (character => {
            return (
                <li key={Math.floor(character.release_year*Math.random()*1000)}>
                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    
                </li>
            )
        })
    }


    return (
        !isLoading && 
            <div className="page-outer"> 
                <div className="page-header">Characters List</div>
                <div>{renderCharacterList(charactersList)}</div>

            </div>
    )


}

export default CharactersList


