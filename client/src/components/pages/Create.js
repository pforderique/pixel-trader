import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "./Create.css";
import "../../utilities.css";
import SidePanel from "../modules/SidePanel.js";

const Create = (props) => {
  // pixel grid properties
  const SIZE = 16; // SIZExSIZE grid
  const [userNetworth, setNetworth] = useState(null);
  const [text, setText] = useState("");
  const [forSale, setForSale] = useState(true);
  const [color, setColor] = useState("#000000");

  let mousePressed = 0;

  useEffect(() => {
    document.title = "PixelTrader: Create";
    setNetworth(props.curr_user.networth);

    document.body.onmousedown = () => {
      ++mousePressed;
    };
    document.body.onmouseup = () => {
      --mousePressed;
    };
  }, []);

  const fillColor = (e) => {
    if (!mousePressed) return;
    e.target.style.backgroundColor = color;
  };

  const [pixels, setPixels] = useState(
    [...Array(SIZE * SIZE).keys()].map((i) => (
      <div
        className="cell u-unselectable"
        id={`cell_${i}`}
        key={`key_${i}`}
        onMouseDown={fillColor}
        onMouseOver={fillColor}
      ></div>
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
    console.log(pixelString.join(""));
    console.log(text);
    console.log(forSale);

    const body = {
      name: text,
      pixels: pixelString.join(""),
      for_sale: forSale,
    };
    post("/api/art", body).then((art) => console.log(art));
    window.location.href = `/profile/${props.curr_user._id}`;
  };

  const handleTypeChange = (event) => {
    if (event.target.value.length > 24) return;
    setText(event.target.value);
  };

  const handleToggle = (event) => {
    setForSale(!forSale);
  };

  return (
    <>
      <div className="u-block u-main-container u-transparent">
        <div className="Create-main-container">
          <div className="Create-GridBorder">
            <div className="Create-Grid">{pixels}</div>
          </div>
          <SidePanel
            textvalue={text}
            networth={userNetworth}
            selling={forSale}
            onChange={handleTypeChange}
            onCreate={onSubmit}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </>
  );
};

export default Create;
