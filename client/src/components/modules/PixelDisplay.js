import React from "react";

import "../../utilities.css";
import "./PixelDisplay.css";

const PixelDisplay = (props) => {
  const styling = props.styling ? props.styling : { width: "16vw" };

  const createPixel = (pixel, idx) => {
    const color = pixel === "1" ? "white" : "black";
    const style = { backgroundColor: color };
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
      <div
        className="PixelDisplay-container"
        onClick={() => (window.location.href = `/art/${props.artid}`)}
        style={styling}
      >
        {props.pixels.split("").map(createPixel)}
      </div>
    </>
  );
};

export default PixelDisplay;
