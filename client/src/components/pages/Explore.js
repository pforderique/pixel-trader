import React, { useState } from "react";

import "../../utilities.css";
import "./Explore.css";

const Explore = (props) => {
  const [text, setText] = useState("");

  const handleTypeChange = (event) => {
    if (event.target.value.length > 24) return;
    setText(event.target.value);
  };

  return (
    <>
      <div className="u-main-container u-transparent">
        Welcome to the explore page ya filthy animal
      </div>
    </>
  );
};

export default Explore;
