import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import logo from "../../public/logosmall.png";
import "./Create.css";
import "../../utilities.css";
import SidePanel from "../modules/SidePanel.js";
// import { ChromePicker } from "react-color"

const Create = (props) => {
  // pixel grid properties
  const SIZE = 10; // SIZExSIZE grid
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
    let new_color = onDraw ? color : "white";
    console.log(new_color);
    cell.style.backgroundColor = new_color;
    cell.color = new_color;
  };

  const [pixels, setPixels] = useState(
    [...Array(SIZE * SIZE).keys()].map((i) => (
      <div
        className="cell u-unselectable"
        id={`cell_${i}`}
        key={`key_${i}`}
        onMouseDown={fillColor}
        onMouseOver={fillColor}
      >
        {" "}
      </div>
    ))
  );

  const onSubmit = () => {
    console.log("info getting submitted:\n");
    let pixelString = [];
    for (const elem of pixels) {
      pixelString.push(
        !!document.getElementById(elem.props.id).style.backgroundColor
          ? "0"
          : "1"
      );
    }
    console.log(pixelString.join(";"));
  };

  return (
    <>
      <div className="u-block u-main-container u-transparent">
        <div className="Create-main-container">
          <div className="Create-GridBorder">
            <div className="Create-Grid">{pixels}</div>
          </div>
          <SidePanel onCreate={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Create;
