import React, { useEffect, useState } from "react";

import { get, post } from "../../utilities.js";

import "../../utilities.css";

const Create = (props) => {
  //   const [user, setUser] = useState(undefined);

  //   useEffect(() => {
  //     document.title = "PixelTrader: Create";

  //     // get profile information about this user
  //     get("/api/user", { user_id: props.userid }).then((u) => {
  //       setUser(u);
  //       console.log(
  //         `User Logged in: ${props.curr_user_id}\nProfile of user: ${u.name} with id ${props.userid} -- art owned: ${u.art_owned}`
  //       );
  //     });
  //   }, []);

  //   if (user === undefined) return <div>Log in to create.</div>;

  return (
    <>
      <div className="u-main-container u-transparent">Hello bitches</div>
    </>
  );
};

export default Create;
