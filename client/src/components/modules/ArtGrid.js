import React from "react";

import ArtBlock from "./ArtBlock";
import "../../utilities.css";
import "./ArtGrid.css";

const ArtGrid = (props) => {
  return (
    <>
      <div className="ArtGrid-container">
        <div className="u-xlarge">{props.title}:</div>
        <div className="ArtGrid-grid">
          {props.arts.reverse().map((art) => (
            <ArtBlock key={`art_${art._id}`} art={art} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtGrid;
