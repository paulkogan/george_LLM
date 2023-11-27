

import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom"; 
import {axiosGetRequest} from '../services/api_service'
import {formatCurrency} from '../services/utils'


const CharacterDetails = ({updateMessage}) => {
    const {id : characterId} = useParams();
    const [characterInfo, setCharacterInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false) 
    const runRef = useRef(false);  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacterInfo = async () => { 
          const api_endpoint_url = `/characters/${characterId}`
          try {
    
                const response = await axiosGetRequest(api_endpoint_url)
                const characterData = response.data.data  
                // console.log("characterData: ", characterData)   
                updateMessage(`Found:  ${characterData.name}`) 
                const firstCharacterRole = characterData.characterRoles[0] 
                let imageUrl = firstCharacterRole.roleActor.image_url
                characterData["image_url"] = imageUrl //add url to character_data
                setCharacterInfo(characterData)
                setIsLoading(false)
          } catch(error) {
               console.log("FE API Error!: failed to fetch character info", error, )
               updateMessage(`ERROR ${error.response.data.message}`)
               navigate("/")             
          }
        }
        
        return () => {
        //run only once
        if (!runRef.current) {
            setIsLoading(true)
            fetchCharacterInfo()     
        }
        
            runRef.current = true;                      
        }

    }, []) 


    


    
    const renderCharacterInfo = (characterInfo) => {
        return (
            <div className="character-parent"> 
                <div className="character-image-box">
                    <img className="character-image" src={characterInfo.image_url} ></img> 
                </div>
                <div className="role-details-box">
                    <div> Civilian name: {characterInfo.civilian}</div>
                    <div> Creature type: {characterInfo.character_type}</div>
                    <div> Powers: {characterInfo.powers}</div>
                </div>

            </div>
        )
    }

    const renderCharacterRoles = (charactersRoles) => {
        // return (
        //     <div>{JSON.stringify(charactersRoles)}</div>
        // )
        if (! charactersRoles) {
            return
        } else {

            return charactersRoles.map(characterRole => {
                return (
                    <div key={characterRole.id} className="role-parent">

                    
                        <div className="role-details-box">
                            <Link className="cross-link" to={`/movies/${characterRole["roleMovie"].id}`}>{characterRole["roleMovie"].title} ({characterRole["roleMovie"].release_year})</Link>
                            <div>{characterRole["roleActor"].first_name} {characterRole["roleActor"].last_name} </div>

                        </div>                 
                    </div>
                )
            })
        }
    }


    return (
        <div className="page-outer"> 
            <div className="page-header">{characterInfo.name}</div>
            {(!isLoading && characterInfo ) &&
                <div>
                    <div className="character-info">{renderCharacterInfo(characterInfo)}</div>
                    <div className="roles-list">{renderCharacterRoles(characterInfo["characterRoles"])}</div>

                </div>
            }
            

        </div>
    )
}

export default CharacterDetails


// <div>{JSON.stringify(characterInfo)}</div>
//{<img className="character-image" src={characterInfo.image_url} ></img>} 


