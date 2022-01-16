import React from "react";

import "../../utilities.css";
import "./Stats.css";

const Stats = (props) => {
  return (
    <>
      <div className="Stats-container">
        <div className="u-xlarge u-center">Stats</div>
        <div>Owner: {props.owner}</div>
        <div>Status: {props.art.for_sale ? "For Sale" : "Not For Sale"}</div>
        <div>Value: {props.art.value} VC</div>
        <div>Change: {props.percentChange}%</div>
        <div>Likes: {props.art.likes}</div>
        <div>Views: {props.art.views}</div>
        <div>Creator: {props.creator}</div>
        <div>Date Created: {props.art.date_created.substring(0, 10)}</div>
      </div>
    </>
  );
};

export default Stats;
