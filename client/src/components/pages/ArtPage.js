import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "./ArtPage.css";
import "../../utilities.css";

const ArtPage = (props) => {
  useEffect(() => {
    document.title = "PixelTrader: Art";
  }, []);

  return (
    <>
      <div className="u-main-container u-transparent">
        Art page! {props.artid}
      </div>
    </>
  );
};

export default ArtPage;
