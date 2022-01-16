import React from "react";
import { getPercentChange } from "../../utilities.js";

import PixelDisplay from "./PixelDisplay";
import "../../utilities.css";
import "./ArtBlock.css";

const ArtBlock = (props) => {
  const percentChange = getPercentChange(props.art);

  return (
    <>
      <div className="ArtBlock-container">
        <div className="u-large">{props.art.name}</div>
        <PixelDisplay artid={props.art._id} pixels={props.art.pixels} />
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
