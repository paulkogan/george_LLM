

import React, {useState, useEffect, useContext} from 'react';
import {axiosPostRequest, axiosGetRequest, openAIPromptRequest} from '../services/api_service'
import {SearchResultsList} from './SearchResultsList.js'

const TextPromptPage = ({updateMessage}) => {
    const [userPrompt, setUserPrompt] = useState("")
    const [engineeredPrompt, setEngineeredPrompt] = useState("")
    const [sqlQuery, setSqlQuery] = useState("")
    const [sqlResponse, setSqlResponse] = useState([])

    const createEngineeredPrompt =  (promptText) => {
    
        return `assuming a data model as follows: 
                movies table contains id, title, release_year, global_box_office
                characters table contains id, name
                actors table contains id, first_name and last_name
                roles table contains character_id, movie_id, actor_id as foreign keys
                Write sql code that selects ${promptText}

                Include id.
                when matching name use iLike instead of exact match equal
                If displaying character_name, label as name.
                If displaying movie_title, label as title.
                Please reply with just the SQL code, without an explanation`
                
    }

    const submitUserPrompt = async () => {

        try {
            const ePrompt = createEngineeredPrompt(userPrompt)
            // console.log(`ePrompt ${ePrompt}`)
            await setEngineeredPrompt(ePrompt)
            const rawSQLAPIResponse = await openAIPromptRequest(ePrompt)
            const rawSQLQuery = (rawSQLAPIResponse.data.choices[0].message.content).replace(/\n/g, " ")
            //console.log(rawSQLQuery)
            await setSqlQuery(rawSQLQuery)
            //await setSqlQuery(rawSQLAPIResponse.data)  
            await submitSQLQuery(rawSQLQuery)

        } catch(error) {
            setSqlResponse([]) 
            console.log(`PROMPT ERROR: ${error}`)
            updateMessage(`PROMPT ERROR: ${error.response.data.error.message}`)   
      }  

    }


    // If showing global_box_office as box office, format as a dollar amount.
    // Include count.

    const submitSQLQuery = async (query) => {
        const submitRawSqlQueryUrl = "/search/raw"
     
        try {
  
            const response = await axiosPostRequest(submitRawSqlQueryUrl, {"sqlquery":query})
            //console.log("order response  ", response)
            const data = await response.data.data
            // console.log("order response status ", response.status)
            console.log("RESPONSE DATA is  ", data)
            if (response.status > 300) {
                setSqlResponse([])    
                console.log(`PROBLEM: ${data.message}`)
                updateMessage(`PROBLEM: ${data.message}`)     
            } else {
                setSqlResponse(data)
                updateMessage(`Found ${data.length} matching items`)
            }      
    
          } catch(error) {
                setSqlResponse([]) 
                console.log(`ERROR: ${error}`)
                updateMessage(`ERROR: ${error}`)   
          }  
        }   
    
  

    return (

        <div className="page-outer"> 
            <div className="page-header">Ask George in Free Text</div>
            <div className="search-label"> Examples:</div>
            <div className="search-instructions"> 
                <li>Which characters have roles in at least 7 movies?</li>
                <li>Which movies have Doctor Strange as a character?</li>
            </div>
           
            <input 
                    className="search-input"
                    type="text"
                    onChange={event => {
                        setUserPrompt(event.target.value);

                    }}
                />
            <button onClick={submitUserPrompt}>Send Prompt</button>
            <div className="search-label"> Engineered Prompt:</div>
            <div className="prompt-text">{engineeredPrompt}</div>
            <div className="search-label"> sqlQuery from LLM:</div>
            <div className="search-sql-query">{JSON.stringify(sqlQuery)}</div>

            


            { (sqlResponse.length > 0) &&
                <div> 
                    <div className="search-label"> Results from DB:</div>
                    <SearchResultsList resultsList={sqlResponse}/>
                </div>
            }
           
        </div>

    )

}

export default TextPromptPage
//<div className="prompt-text">userPrompt: {userPrompt}</div>