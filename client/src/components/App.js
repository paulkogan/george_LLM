import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import MoviesList from "./MoviesList.js"
import MovieDetails from "./MovieDetails.js"
import ActorsList from "./ActorsList.js"
import SearchPage from "./SearchPage.js"
import Nav from "./Nav.js"

function App() {
  return (
    <div className="app-outer">
        <div>Welcome to the Curious George!</div>
        <Router> 
              <Nav />
              <Routes>
                  <Route path="/"  element={<SearchPage/>} />
                  <Route path="/movies"  element={<MoviesList/>} />
                  <Route path="/movies/:id"  element={<MovieDetails /> } />
                  <Route path="/search"  element={<SearchPage/>} />
                  <Route path="/actors"  element={<ActorsList/>} />
              </Routes>

        </Router>
    </div>
  );
}

export default App;
//<Route path="/movies/:id"  element={(params) => <MovieDetails {...params} /> } />