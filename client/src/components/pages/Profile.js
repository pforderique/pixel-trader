import React, { useEffect } from "react";

// import ArtGrid from "../modules/ArtGrid";
// import MainProfile from "../modules/MainProfile";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  return (
    <>
      <div className="Profile-container u-transparent">
        {/* <MainProfile username={props.username} />
        <Gallery /> */}
        Wassup baby, take me out to dinner
      </div>
    </>
  );
};

export default Profile;
