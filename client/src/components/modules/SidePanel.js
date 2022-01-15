import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "./SidePanel.css";
import "../../utilities.css";

const SidePanel = (props) => {
  const PRICE_TO_CREATE = 1000;
  return (
    <>
      <div className="SidePanel-container">
        <label className="SidePanel-TextField">
          <div className="u-xlarge">Title:</div>
          <input
            className="SidePanel-Input"
            type="text"
            onChange={props.onChange}
            value={props.textvalue}
            placeholder="name your creation"
          />
        </label>
        <div className="u-white-container SidePanel-bottom">
          <div className="SidePanel-disclaimer">
            Networth: {props.networth} VC
          </div>
          <button
            className="SidePanel-btn"
            disabled={
              !(
                props.textvalue.length >= 3 &&
                props.networth &&
                props.networth >= PRICE_TO_CREATE
              )
            }
            onClick={props.onCreate}
          >
            Create
          </button>
          <div className="SidePanel-disclaimer">
            Price: {PRICE_TO_CREATE} VC
          </div>
        </div>
        <label className="SidePanel-toggleSection">
          For Sale?
          <input
            type="checkbox"
            checked={props.selling}
            onChange={props.onToggle}
          />
        </label>
      </div>
    </>
  );
};

export default SidePanel;
