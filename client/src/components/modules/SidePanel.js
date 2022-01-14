import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "./SidePanel.css";
import "../../utilities.css";

const SidePanel = (props) => {
  const onPen = () => {
    props.changeDraw(true);
  };

  const onEraser = () => {
    props.changeDraw(false);
  };
  return (
    <>
      <div className="ToolSelector-container">
        Side Panel!
        <button class="btn" onClick={props.onCreate}>
          Create
        </button>
        {/* <input
          type="color"
          onChange={props.onPick}
          value={props.currcolor}
          class="color"
        ></input> */}
        {/* <input type="number" value="30" class="size"></input> */}
        {/* <div>
          <input
            id="pen"
            type="radio"
            name="test"
            value="small"
            checked="true"
            onClick={onPen}
          ></input>
          <i class="fas fa-pen fa-2x"></i>
          <input
            id="eraser"
            type="radio"
            name="test"
            value="small"
            checked="false"
            onClick={onEraser}
          ></input>
          <i class="fas fa-eraser fa-2x"></i>
        </div> */}
      </div>
    </>
  );
};

export default SidePanel;
