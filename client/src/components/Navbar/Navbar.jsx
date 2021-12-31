import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { AuthContext } from "../../context/auth.context";


const Navbar = (props) => {
  const {isLoggedIn, logOutUser} = useContext(AuthContext)
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP}
      </Link>

      <div className="nav__authLinks">
        {isLoggedIn ? (
          <>
            <Link to={PATHS.MISSIONLOG} className="authLink">
              Missions Log
            </Link>
            <button className="nav-logoutbtn" onClick={logOutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
