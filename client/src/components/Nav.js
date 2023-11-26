import React, { useContext} from 'react';
import {
  Link, 
  useNavigate
} from "react-router-dom";

import './App.css';



const Nav = ({statusMessage}) => {
  const navigate = useNavigate(); 


  const goOnClick = async () => {
    // const logoutResult = await auth.handleLogoutHook()
    // if (logoutResult.status === 'fail') {
    //   navigate('/login')
    // } 
  }

  return (
      <div className="nav-outer" >
            <div className="home-links">

                <div className="nav-link"> 
                  <Link to="/">Search</Link>
                </div> 
                <div className="nav-link"> 
                  <Link to="/movies">Movies</Link>
                </div> 
                <div className="nav-link"> 
                  <Link to="/actors">Actors</Link>
                </div> 

            </div>
            <div className="nav-message">
              {statusMessage}
            </div>

      </div>
  );
}

export default Nav;