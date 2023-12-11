

import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, Link} from "react-router-dom"; 



const SearchResultsList = ({resultsList}) => {
    const [isLoading, setIsLoading] = useState(false) 
    const navigate = useNavigate();
    const displayFields = [
        "title",
        "release_year", 
        "name", 
        "character_name", 
        "movie_title", 
        "first_name", 
        "last_name",
        "count"
    ]



    const renderResult = (result) => {
        return (
            <div className="result-inner">
                {Object.entries(result)
                    .filter(([key, val])=> displayFields.includes(key))
                    .map(([key, val]) => (
                    <span key={result.id+key}>{val} </span>
                    )
                )}
        
            </div>
        )

        
    }


    const renderSearchResults = (resultsList) => {
        //console.log(`Render Search Results - ${JSON.stringify(resultsList)}`)
        if (!resultsList || resultsList.length<1) {
            return (<div>No results!</div>)
        } else {

            return resultsList.map(result => {
                return (

                    <div key={result.id} className="result-parent">
                        {renderResult(result)}                            
                    </div>
                )
            })
        }
    }

   
    return (
        <div className="page-outer"> 
            <div className="page-header">Search Results</div>
            {
                <div>
                    <div className="search-results">{renderSearchResults(resultsList)}</div>
                </div>
            }
            

        </div>
    )
}

export {SearchResultsList}


// <div>{JSON.stringify(movieInfo)}</div>



