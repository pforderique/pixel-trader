import React from "react";

import "../../utilities.css";
import "./PixelDisplay.css";

const PixelDisplay = (props) => {
  const createPixel = (pixel, idx) => {
    const color = pixel === "1" ? "white" : "black";
    const Opcolor = pixel === "1" ? "black" : "white";
    const style = { backgroundColor: color, color: Opcolor };
    return (
      <div
        key={`pixel_${idx}`}
        className="PixelDisplay-Pixel"
        style={style}
      ></div>
    );
  };
  return (
    <>
      <div className="PixelDisplay-container">
        {props.pixels.split("").map(createPixel)}
      </div>
    </>
  );
};

export default PixelDisplay;
