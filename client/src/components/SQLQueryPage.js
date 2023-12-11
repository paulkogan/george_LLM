

import React, {useState, useEffect, useContext} from 'react';
import {axiosPostRequest, axiosGetRequest,} from '../services/api_service'
import {SearchResultsList} from './SearchResultsList.js'

const SQLQueryPage = ({updateMessage}) => {
    const [sqlQuery, setSqlQuery] = useState("SELECT characters.name, COUNT(*) as count FROM characters INNER JOIN roles ON characters.id = roles.character_id GROUP BY characters.name HAVING COUNT(DISTINCT roles.movie_id) >= 7;")
    const [sqlResponse, setSqlResponse] = useState([])



    const submitRawSQLQuery = async () => {
        const submitRawSqlQueryUrl = "/search/raw"
     
        try {
  
            const response = await axiosPostRequest(submitRawSqlQueryUrl, {"sqlquery":sqlQuery})
            //console.log("order response  ", response)
            const data = await response.data.data
            // console.log("order response status ", response.status)
            console.log("RESPONSE DATA is  ", data)
            if (response.status > 300) {
                setSqlResponse([])    
                // console.log(`PROBLEM: ${data.message}`)
                updateMessage(`PROBLEM: ${data.message}`)     
            } else {
                setSqlResponse(data)
                updateMessage(`Found ${data.length} matching items`)

            }      
    
          } catch(error) {
                setSqlResponse([]) 
                // console.log(`ERROR: ${error}`)
                updateMessage(`ERROR: ${error}`)   
          }  
        }     
    
  

    return (

        <div className="page-outer"> 
            <div className="page-header">Ask George in SQL</div>
            <div className="search-query">{sqlQuery}</div>
            
            <input 
                    className="search-input"
                    type="text"
                    placeholder="SELECT * FROM ..."
                    onChange={event => {
                        setSqlQuery(event.target.value);

                    }}
                />
            <button onClick={submitRawSQLQuery}>Send Query</button>
            { (sqlResponse.length > 0) &&
                <SearchResultsList resultsList={sqlResponse}/>
            }
        </div>

    )

}

export default SQLQueryPage
