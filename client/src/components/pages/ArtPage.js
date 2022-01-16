import React, { useEffect, useState } from "react";

import { get, post, getPercentChange } from "../../utilities.js";

import PixelDisplay from "../modules/PixelDisplay.js";
import Stats from "../modules/Stats.js";

import "./ArtPage.css";
import "../../utilities.css";

const ArtPage = (props) => {
  const [art, setArt] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [creator, setCreator] = useState(undefined);
  const [percentChange, setChange] = useState(undefined);

  const style = { width: "35vw" };

  useEffect(() => {
    get("/api/art", { art_id: props.artid }).then((a) => {
      if (!a._id) setArt(null);
      else {
        setArt(a);
        setChange(getPercentChange(a));
        document.title = `PixelTrader | ${a.name}`;

        // increment view and value by 1 on each GET req to an art
        const body = { art_id: a._id, value: 1, views: 1 };
        post("/api/art/increment", body);

        // get owner and creator names for display
        get("/api/user", { user_id: a.owner_id }).then((o) => setOwner(o.name));
        get("/api/user", { user_id: a.creator_id }).then((c) =>
          setCreator(c.name)
        );
      }
    });
  }, []);

  if (art === undefined) return <div>Loading...</div>;
  if (art === null) return <div>Could not find art.</div>;

  return (
    <>
      <div className="ArtPage-container u-main-container u-transparent">
        <div className="ArtPage-title u-xlarge">Title: {art.name}</div>
        <div className="ArtPage-subcontainer">
          <PixelDisplay
            artid={props.artid}
            pixels={art.pixels}
            styling={style}
          />
          <Stats
            owner={owner}
            creator={creator}
            art={art}
            percentChange={percentChange}
          />
        </div>
      </div>
    </>
  );
};

export default ArtPage;
