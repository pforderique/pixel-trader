import React from "react";

import "../../utilities.css";
import "./Stats.css";

const Stats = (props) => {
  if (!props.art) return <div>Loading art...</div>;
  return (
    <>
      <div className="Stats-container">
        <div className="u-xlarge Stats-title">
          {props.art.name}
          {props.curr_user._id &&
            props.isLiked !== undefined &&
            (props.isLiked ? (
              <i
                className="Stats-unlike fas fa-heart"
                onClick={props.onUnlike}
              ></i>
            ) : (
              <i className="Stats-like far fa-heart" onClick={props.onLike}></i>
            ))}
        </div>
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
        <div className="Stats-button-container">
          {props.curr_user._id && props.curr_user._id === props.art.owner_id ? (
            <button className="Stats-delete" onClick={props.onDelete}>
              DELETE
            </button>
          ) : (
            <button className="Stats-purchase" onClick={props.onPurchase}>
              Purchase
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Stats;
