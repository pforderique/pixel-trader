import { Link } from "@reach/router";
import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages.
 */

const GOOGLE_CLIENT_ID =
  "170675107127-kmmn659d6jd5ocajlld82mqbvbddmi6g.apps.googleusercontent.com";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock u-bold">PixelTrader</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Explore
        </Link>
        {props.curr_user_id && (
          <Link to={`/profile/${props.curr_user_id}`} className="NavBar-link">
            Profile
          </Link>
        )}
        {props.curr_user_id && (
          <Link to={`/create`} className="NavBar-link">
            Create
          </Link>
        )}
        {props.curr_user_id ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
