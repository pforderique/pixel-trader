import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";
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
  const [isFollowing, setFollowing] = useState(undefined);

  useEffect(() => {
    // check if logged in user follows this users profile
    if (props.curr_user._id && props.curr_user._id !== props.user._id) {
      get("/api/follow", {
        follower_id: props.curr_user._id,
        following_id: props.user._id,
      }).then((follow) => {
        follow._id ? setFollowing(true) : setFollowing(false);
      });
    }
  }, []);

  const FollowCheck = (e) => {
    e.preventDefault();
    const body = {
      follower_id: props.curr_user._id,
      following_id: props.user._id,
    };
    post("/api/follow", body).then((user_followed) => {
      setFollowing(true);
      props.updateUser(user_followed);
    });
  };

  const UnFollowCheck = (e) => {
    const body = {
      follower_id: props.curr_user._id,
      following_id: props.user._id,
    };
    post("/api/unfollow", body).then((user_unfollowed) => {
      setFollowing(false);
      props.updateUser(user_unfollowed);
    });
  };

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
        <div>
          <div>Net Worth: {props.user.networth} VC</div>
          <div>Gallery: {props.user.art_owned.length}</div>
        </div>
        {props.curr_user._id &&
          props.curr_user._id !== props.user._id &&
          isFollowing !== undefined &&
          (isFollowing ? (
            <button
              className="MainProfile-UnfollowButton"
              onClick={UnFollowCheck}
            >
              following
            </button>
          ) : (
            <button className="MainProfile-FollowButton" onClick={FollowCheck}>
              follow
            </button>
          ))}
      </span>
    </div>
  );
};

export default MainProfile;
