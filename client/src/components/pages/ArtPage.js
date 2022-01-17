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
  const [isLiked, setLiked] = useState(undefined);

  const style = { width: "35vw" };

  useEffect(() => {
    // get information on this art piece
    get("/api/art", { art_id: props.artid }).then((a) => {
      if (!a._id) setArt(null);
      else {
        document.title = `PixelTrader | ${a.name}`;

        // increment view and value by 1 on each GET req to an art
        const body = { art_id: a._id, value: 1, views: 1 };
        post("/api/art/increment", body).then((updated_art) => {
          setArt(updated_art);
          setChange(getPercentChange(updated_art));
        });

        // get owner and creator names for display
        get("/api/user", { user_id: a.owner_id }).then((o) => setOwner(o.name));
        get("/api/user", { user_id: a.creator_id }).then((c) =>
          setCreator(c.name)
        );
      }
    });
  }, []);

  useEffect(() => {
    // check if user has liked this piece of art
    props.curr_user_id &&
      get("/api/like", {
        user_id: props.curr_user_id,
        art_id: props.artid,
      }).then((like) => {
        if (like._id) setLiked(true);
        else setLiked(false);
      });
  }, [props.curr_user_id]);

  const onPurchase = () => {
    console.log("purchased!");
    console.log(props.curr_user_id, art.owner_id);
  };

  const onDelete = () => {
    console.log("deleting art!");
  };

  const onLike = () => {
    console.log("liked!");
    setLiked(true);
    // add like object
    const body = { user_id: props.curr_user_id, art_id: art._id };
    post("/api/like", body).then((a) => {
      // increment value by 10
      post("/api/art/increment", { art_id: a._id, value: 10, views: 0 }).then(
        (artres) => {
          setArt(artres);
          setChange(getPercentChange(artres));
        }
      );
    });
  };

  const onUnlike = () => {
    console.log("unliked!");
    setLiked(false);
    const body = { user_id: props.curr_user_id, art_id: art._id };
    post("/api/unlike", body).then((a) => {
      // decrement value by 10
      post("/api/art/increment", { art_id: a._id, value: -10, views: 0 }).then(
        (artres) => {
          setArt(artres);
          setChange(getPercentChange(artres));
        }
      );
    });
  };

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
            onPurchase={onPurchase}
            onDelete={onDelete}
            onUnlike={onUnlike}
            onLike={onLike}
            isLiked={isLiked}
            curr_user_id={props.curr_user_id}
          />
        </div>
      </div>
    </>
  );
};

export default ArtPage;
