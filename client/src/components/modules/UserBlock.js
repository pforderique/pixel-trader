import React from "react";

import "../../utilities.css";
import "./UserBlock.css";

const UserBlock = (props) => {
  return (
    <>
      <div className="UserBlock-container">
        <div className="u-large">{props.user.name}</div>
        <div className="UserBlock-headline1">
          <div>{`following: ${props.user.following}`}</div>
          <div>{`followers: ${props.user.followers}`}</div>
        </div>
      </div>
    </>
  );
};

export default UserBlock;
