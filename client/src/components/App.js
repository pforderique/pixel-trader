import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import ArtPage from "./pages/ArtPage.js";
import Create from "./pages/Create.js";
import Explore from "./pages/Explore.js";
import NotFound from "./pages/NotFound.js";
import Secret from "./pages/Secret.js";
import Profile from "./pages/Profile.js";

// import { socket } from "../client-socket.js";
import { get, post } from "../utilities.js";
import NavBar from "./modules/Navbar.js";

import "../utilities.css";

/**
 * Define the "App" component
 */
const App = () => {
  const [curr_user, setCurrUser] = useState({ _id: null });

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setCurrUser(user);
      }
    });

    // load in the icon js
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/ecfdf53d85.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setCurrUser(user);
    });
  };

  const handleLogout = () => {
    setCurrUser({ _id: null });
    post("/api/logout");
  };

  return (
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        curr_user={curr_user}
      />
      <Router>
        <Explore path="/" curr_user={curr_user} />
        <Profile path="/profile/:userid" curr_user={curr_user} />
        {curr_user._id && <Create path="/create" curr_user={curr_user} />}
        <ArtPage path="/art/:artid" curr_user={curr_user} />
        <Secret path="/secret" />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
