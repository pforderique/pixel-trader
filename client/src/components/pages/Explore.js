import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import ArtGrid from "../modules/ArtGrid";
import SearchBar from "../modules/SearchBar";
import UserGrid from "../modules/UserGrid";
import "../../utilities.css";
import "./Explore.css";

const Explore = (props) => {
  const [searchtext, setText] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [artResults, setArtResults] = useState([]);
  const [artResults2, setArtResults2] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    get("/api/art/trending").then((trending) => {
      setArtResults(trending);
    });

    get("/api/art/following").then((arts) => {
      setArtResults2(arts);
    });
  }, []);

  const handleTypeChange = (event) => {
    if (event.target.value.length > 24) return;
    setText(event.target.value);
  };

  const handleSearch = (event) => {
    setText("");
    setHasSearched(true);
    get("/api/search", { q: searchtext }).then((results) => {
      setUserResults(results.users);
      setArtResults(results.arts);
    });
  };

  const onTest = () => {
    console.log(userResults);
    console.log(artResults);
  };

  return (
    <>
      <div className="u-main-container u-transparent">
        <SearchBar
          textvalue={searchtext}
          onChange={handleTypeChange}
          onSubmit={handleSearch}
        />
        {!hasSearched && <ArtGrid title={"Trending"} arts={artResults} />}
        {!hasSearched && props.curr_user._id && (
          <ArtGrid title={"Following"} arts={artResults2} />
        )}
        {hasSearched && <UserGrid title={"Users"} users={userResults} />}
        {hasSearched && <ArtGrid title={"Art"} arts={artResults} />}
      </div>
      {/* <button onClick={onTest}>Test me!</button> */}
    </>
  );
};

export default Explore;
