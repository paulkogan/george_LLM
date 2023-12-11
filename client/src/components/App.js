import './App.css';
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import MoviesList from "./MoviesList.js"
import MovieDetails from "./MovieDetails.js"
import ActorsList from "./ActorsList.js"
import CharactersList from "./CharactersList.js"
import CharacterDetails from "./CharacterDetails.js"
import SQLQueryPage from "./SQLQueryPage.js"
import TextPromptPage from "./TextPromptPage.js"
import Nav from "./Nav.js"

function App() {
  const [statusMessage, setStatusMessage] = useState("")
  return (
    <div className="app-outer">
        <div>Welcome to the Curious George!</div>
        <Router> 
              <Nav statusMessage = {statusMessage}/>
              <Routes>
                  <Route path="/"  element={<TextPromptPage updateMessage = {setStatusMessage}/>} />
                  <Route path="/movies"  element={<MoviesList updateMessage = {setStatusMessage}/>} />

                  <Route path="/movies/:id"  element={<MovieDetails updateMessage = {setStatusMessage}/>} />
                  <Route path="/characters"  element={<CharactersList updateMessage = {setStatusMessage}/>} />
                  <Route path="/characters/:id"  element={<CharacterDetails updateMessage = {setStatusMessage}/>} />

                  <Route path="/sqlquery"  element={<SQLQueryPage updateMessage = {setStatusMessage}/>} />
                  <Route path="/textprompt"  element={<TextPromptPage updateMessage = {setStatusMessage}/>} />
                  <Route path="/actors"  element={<ActorsList/>} />
              </Routes>

        </Router>
    </div>
  );
}

export default App;

