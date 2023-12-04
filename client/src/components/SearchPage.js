

import React, {useState, useEffect, useContext} from 'react';
import {axiosPostRequest, axiosGetRequest,} from '../services/api_service'
import {SearchResultsList} from './SearchResultsList.js'

const SearchPage = ({updateMessage}) => {
    const [sqlQuery, setSqlQuery] = useState("select * from movies where title ilike '%Spider%';")
    const [sqlResponse, setSqlResponse] = useState("")



    const submitRawSQLQuery = async () => {
        const submitRawSqlQueryUrl = "/search/raw"
     
        try {
  
            const response = await axiosPostRequest(submitRawSqlQueryUrl, {"sqlquery":sqlQuery})
            //console.log("order response  ", response)
            const data = await response.data.data
            // console.log("order response status ", response.status)
            console.log("RESPONSE DATA is  ", data)
            if (response.status > 300) {
                setSqlResponse(`PROBLEM: ${data.message}`)     
            } else {
                setSqlResponse(data)
                updateMessage(`Found ${data.length} matching items`)

            }      
    
          } catch(error) {
                setSqlResponse(`ERROR: ${error}`) 
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
            <SearchResultsList resultsList={sqlResponse}/>
        </div>

    )

}

export default SearchPage

//<div className="search-response">{JSON.stringify(sqlResponse)}</div>