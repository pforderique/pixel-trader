import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";
import ArtGrid from "../modules/ArtGrid";
import MainProfile from "../modules/MainProfile";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    document.title = "PixelTrader: Profile";
    get("/api/user", { user_id: props.userid }).then((u) => {
      setUser(u);
      console.log(`Profile of user: ${u.name} with id ${props.userid} -- ${u.art_owned}`);
    });
  }, []);

  if (user === undefined) return <div>Loading...</div>;

  return (
    <>
      <div className="Profile-container u-transparent">
        <MainProfile user={user} />
        <ArtGrid title={"Gallery"} include_owner={false} arts={user.art_owned} />
      </div>
    </>
  );
};

export default Profile;
