import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import Explore from "./pages/Explore.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";

// import { socket } from "../client-socket.js";
import { get, post } from "../utilities.js";
import NavBar from "./modules/Navbar.js";

import "../utilities.css";

/**
 * Define the "App" component
 */
const App = () => {
  const [curr_user_id, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      // post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        curr_user_id={curr_user_id}
      />
      <h1>Youre logged in with userid: {curr_user_id}</h1>
      <Router>
        {/* <Explore path="/" curr_user_id={curr_user_id} /> */}
        <Profile path="/profile/:userid" />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
