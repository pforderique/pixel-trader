import React from "react";

import ArtBlock from "./ArtBlock";
import "../../utilities.css";
import "./ArtGrid.css";

const ArtGrid = (props) => {
  return (
    <>
      <div className="ArtGrid-container">
        <div className="u-xlarge">{props.title}:</div>
        {props.arts.length > 0 ? (
          <div className="ArtGrid-grid">
            {props.arts.map((art) => (
              <ArtBlock key={`art_${art._id}`} art={art} />
            ))}
          </div>
        ) : (
          <div className="ArtGrid-none">no art found</div>
        )}
      </div>
    </>
  );
};

export default ArtGrid;
