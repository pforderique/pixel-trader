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
        {props.curr_user._id &&
          (props.curr_user._id === props.art.owner_id ? (
            <div className="Stats-owner">
              <label>
                For Sale?
                <input
                  type="checkbox"
                  checked={props.art.for_sale}
                  onChange={props.onToggle}
                />
              </label>
              <i
                className="far fa-trash-alt Stats-delete"
                onClick={props.onDelete}
              ></i>
            </div>
          ) : (
            <div className="Stats-button-container">
              <button
                className="Stats-purchase"
                onClick={props.onPurchase}
                disabled={
                  !props.art.for_sale ||
                  props.curr_user.networth < props.art.value
                }
              >
                Purchase
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Stats;
