import React from "react";

import PixelDisplay from "./PixelDisplay";
import "../../utilities.css";
import "./ArtBlock.css";

const ArtBlock = (props) => {
  const percentChange =
    ((props.art.value - props.art.last_value) * 100) / props.art.last_value;
  if (percentChange !== 0) {
    if (percentChange < 0) percentChange = "-" + percentChange.toString();
    else percentChange = "+" + percentChange.toString();
  }
  return (
    <>
      <div className="ArtBlock-container">
        <div className="u-large">{props.art.name}</div>
        <PixelDisplay pixels={props.art.pixels} />
        <div className="ArtBlock-headline1">
          <div>{props.art.for_sale ? "For Sale" : "Not For Sale"}</div>
          <div>{`Likes: ${props.art.likes}`}</div>
        </div>
        <div className="ArtBlock-headline2">
          <div>{`Value: ${props.art.value}`}</div>
          <div>{percentChange}%</div>
        </div>
      </div>
    </>
  );
};

export default ArtBlock;
