import React, { useEffect, useState } from "react";

import "./SearchBar.css";
import "../../utilities.css";

const SearchBar = (props) => {
  return (
    <>
      <div className="SearchBar-container">
        <div className="SearchBar-searchLabel">Search:</div>
        <input
          className="SearchBar-Input"
          type="text"
          onChange={props.onChange}
          value={props.textvalue}
          placeholder="user or art name"
        />
        <i
          className="fas fa-search SearchBar-icon"
          onClick={props.onSubmit}
        ></i>
      </div>
    </>
  );
};

export default SearchBar;
