import React from "react";

import "./MainProfile.css";
import "../../utilities.css";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} username of user
 */
const MainProfile = (props) => {
  return (
    <div className="MainProfile-container">
      <span className="MainProfile-imageContainer">
        <img
          className="MainProfile-img"
          src={require("../../public/noprofile.png")}
          alt="profilepic"
        />
      </span>
      <span className="MainProfile-userInfo">
        <div className="MainProfile-username u-bold">{props.username}</div>
        <div className="MainProfile-FollowContainer">
          <span className="MainProfile-FollowInfo">Following: 40</span>
          <span className="MainProfile-FollowInfo">Followers: 15</span>
        </div>
        <div>Net Worth: 1000 VC</div>
        <div>Gallery: 7</div>
      </span>
    </div>
  );
};

export default MainProfile;

{
  /* <div className="MainProfile-container">
<div className="MainProfile-imageContainer">
  <img
    className="MainProfile-img"
    src={require("../../public/noprofile.png")}
    alt="profilepic"
  />
</div>
<div className="MainProfile-userInfo">
  <div className="MainProfile-username u-bold">{props.username}</div>
  <div className="MainProfile-FollowContainer">
    <span className="MainProfile-FollowInfo">Following: 40</span>
    <span className="MainProfile-FollowInfo">Followers: 15</span>
  </div>
  <div>Net Worth: 1000 VC</div>
  <div>Gallery: 7</div>
</div>
</div> */
}
