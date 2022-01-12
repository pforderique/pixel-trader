import React from "react";

import noavatar from "../../public/noavatar.png";
import "./MainProfile.css";
import "../../utilities.css";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} user of profile
 */
const MainProfile = (props) => {
  return (
    <div className="MainProfile-container">
      <span className="MainProfile-imageContainer">
        <img className="MainProfile-img" src={noavatar} alt="profilepic" />
      </span>
      <span className="MainProfile-userInfo">
        <div className="MainProfile-username u-bold">{props.user.name}</div>
        <div>
          <div className="u-large">Followers: {props.user.followers}</div>
          <div className="u-large">Following: {props.user.following}</div>
        </div>
        <div>Net Worth: {props.user.networth} VC</div>
        <div>Gallery: {props.user.art_owned.length}</div>
        {props.curr_user_id && props.curr_user_id !== props.user._id && (
          <div>Follow</div>
        )}
      </span>
    </div>
  );
};

export default MainProfile;
