import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";
import ArtGrid from "../modules/ArtGrid";
import MainProfile from "../modules/MainProfile";

import "../../utilities.css";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [artObjs, setArts] = useState([]);

  useEffect(() => {
    document.title = "PixelTrader: Profile";

    // get profile information about this user
    get("/api/user", { user_id: props.userid }).then((u) => {
      setUser(u);

      u.art_owned.length !== 0 &&
        get("/api/arts", { art_ids: u.art_owned.join(";") }).then((arts) =>
          setArts(arts.reverse())
        );

      console.log(
        `User Logged in: ${props.curr_user._id}\nProfile of user: ${u.name} with id ${props.userid} -- art owned: ${u.art_owned}`
      );
    });
  }, []);

  if (user === undefined) return <div>Loading...</div>;
  if (!user._id) return <div>No user.</div>;

  return (
    <>
      <div className="u-main-container u-transparent">
        <MainProfile
          user={user}
          curr_user={props.curr_user}
          updateUser={setUser}
        />
        <ArtGrid title={"Gallery"} include_owner={false} arts={artObjs} />
      </div>
    </>
  );
};

export default Profile;
