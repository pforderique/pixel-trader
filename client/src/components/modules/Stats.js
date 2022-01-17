import React from "react";

import "../../utilities.css";
import "./Stats.css";

const Stats = (props) => {
  return (
    //TODO: render delete or purchase button! start by checking currid != art.owner_id
    <>
      <div className="Stats-container">
        <div className="u-xlarge u-textCenter">Stats</div>
        <div className="Stats-stats">
          <div>Owner: {props.owner}</div>
          <div>Status: {props.art.for_sale ? "For Sale" : "Not For Sale"}</div>
          <div>Value: {props.art.value} VC</div>
          <div>Change: {props.percentChange}%</div>
          <div>Views: {props.art.views}</div>
          <div>Likes: {props.art.likes}</div>
          <div>Creator: {props.creator}</div>
          <div>Date Created: {props.art.date_created.substring(0, 10)}</div>
        </div>
        {props.isLiked &&
          (props.isLiked ? (
            <button onClick={props.onUnlike}>Unlike</button>
          ) : (
            <button onClick={props.onLike}>Like</button>
          ))}
        <button onClick={props.onPurchase}>Purchase</button>
      </div>
    </>
  );
};

export default Stats;
