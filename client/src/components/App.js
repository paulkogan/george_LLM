import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import Movies from "./Movies.js"
import Actors from "./Actors.js"
import Nav from "./Nav.js"

function App() {
  return (
    <div className="app-outer">
        <div>George Home</div>
        <Router> 
              <Nav />
              <Routes>
                  <Route path="/"  element={<Movies/>} />
                  <Route path="/movies"  element={<Movies/>} />
                  <Route path="/actors"  element={<Actors/>} />
              </Routes>

        </Router>
    </div>
  );
}

export default App;
