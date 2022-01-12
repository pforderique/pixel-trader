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
        <div className="MainProfile-FollowContainer">
          <span className="MainProfile-FollowInfo">Following: {props.user.following}</span>
          <span className="MainProfile-FollowInfo">Followers: {props.user.followers}</span>
        </div>
        <div>Net Worth: {props.user.networth} VC</div>
        <div>Gallery: {props.user.art_owned.length}</div>
      </span>
    </div>
  );
};

export default MainProfile;
