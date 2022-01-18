import React from "react";

import noavatar from "../../public/noavatar.png";
import "../../utilities.css";
import "./UserBlock.css";

const UserBlock = (props) => {
  const onUserClick = () => {
    window.location.href = `/profile/${props.user._id}`;
  };
  return (
    <>
      <div className="UserBlock-container" onClick={onUserClick}>
        <div className="u-large">{props.user.name}</div>
        <img className="UserBlock-img" src={noavatar} alt="profilepic" />
        <div>{`networth: ${props.user.networth} VC`}</div>
        <div className="UserBlock-headline2">
          <div>{`followers: ${props.user.followers}`}</div>
          <div>{`following: ${props.user.following}`}</div>
        </div>
      </div>
    </>
  );
};

export default UserBlock;
