import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";
import ArtGrid from "../modules/ArtGrid";
import MainProfile from "../modules/MainProfile";

import "../../utilities.css";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    document.title = "PixelTrader: Profile";

    // get profile information about this user
    get("/api/user", { user_id: props.userid }).then((u) => {
      setUser(u);
      console.log(
        `User Logged in: ${props.curr_user_id}\nProfile of user: ${u.name} with id ${props.userid} -- art owned: ${u.art_owned}`
      );
    });
  }, []);

  if (user === undefined) return <div>Loading...</div>;

  return (
    <>
      <div className="u-main-container u-transparent">
        <MainProfile user={user} curr_user_id={props.curr_user_id} />
        <ArtGrid
          title={"Gallery"}
          include_owner={false}
          arts={user.art_owned}
        />
      </div>
    </>
  );
};

export default Profile;
