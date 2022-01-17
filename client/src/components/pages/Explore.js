import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import SearchBar from "../modules/SearchBar";
import "../../utilities.css";
import "./Explore.css";

const Explore = (props) => {
  const [searchtext, setText] = useState("");
  const [userResults, setUserResults] = useState(undefined);
  const [artResults, setArtResults] = useState(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!hasSearched) {
      get("/api/art/trending?count=8").then((trending) => {
        setArtResults(trending);
      });
    }
  }, []);

  const handleTypeChange = (event) => {
    if (event.target.value.length > 24) return;
    setText(event.target.value);
  };

  const handleSearch = (event) => {
    setHasSearched(true);
    console.log(searchtext);
    console.log(artResults[0]);
  };

  return (
    <>
      <div className="u-main-container u-transparent">
        <SearchBar
          textvalue={searchtext}
          onChange={handleTypeChange}
          onSubmit={handleSearch}
        />
        {!hasSearched && "show trending"}
        {!hasSearched && props.curr_user._id && "show art following"}
        {hasSearched && "show users"}
        {hasSearched && "show arts"}
      </div>
    </>
  );
};

export default Explore;
