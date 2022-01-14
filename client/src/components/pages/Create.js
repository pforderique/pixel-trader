import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "./Create.css";
import "../../utilities.css";

const Create = (props) => {
  // pixel grid properties
  const SIZE = 8; // SIZExSIZE grid
  const [onDraw, setDraw] = useState(true);
  const [color, setColor] = useState("#000000");

  let mousePressed = 0;
  document.body.onmousedown = () => {
    ++mousePressed;
  };
  document.body.onmouseup = () => {
    --mousePressed;
  };

  const fillColor = (e) => {
    if (!mousePressed) return;
    const cell = e.target;
    cell.style.backgroundColor = color;
  };

  const [pixels, setPixels] = useState(
    [...Array(SIZE * SIZE).keys()].map((i) => (
      <div
        className="cell u-unselectable"
        key={`key_${i}`}
        onMouseDown={fillColor}
        onMouseOver={fillColor}
      ></div>
    ))
  );

  return (
    <>
      <div className="u-block u-main-container u-transparent">
        Create:
        <div className="Create-main-container">
          <div className="Create-GridBorder">
            <div className="Create-Grid">{pixels}</div>
          </div>
          <div className="Create-SidePanel">
            Side Panel!
            <button class="btn">Reset</button>
            <input type="color" value="#00eeff" class="color"></input>
            <input type="number" value="30" class="size"></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
