import React, { useState } from "react";

import SearchBar from "../modules/SearchBar";
import "../../utilities.css";
import "./Explore.css";

const Explore = (props) => {
  const [searchtext, setText] = useState("");
  const [results, setResults] = useState(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTypeChange = (event) => {
    if (event.target.value.length > 24) return;
    setText(event.target.value);
  };

  return (
    <>
      <div className="u-main-container u-transparent">
        <SearchBar onChange={handleTypeChange} textvalue={searchtext} />
      </div>
    </>
  );
};

export default Explore;
