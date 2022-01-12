import React from "react";

import "../../utilities.css";
import "./ArtGrid.css";

const ArtGrid = (props) => {
  return (
    <>
      <div className="ArtGrid-container">
        <div className="u-xlarge">{props.title}:</div>
        <div className="ArtGrid-grid">
          Not Implemented. User's arts: {props.arts}
        </div>
      </div>
    </>
  );
};

export default ArtGrid;
