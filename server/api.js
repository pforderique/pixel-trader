/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const data = {
  users: [
    {
      _id: 0,
      username: "fabrizzioorderique", // unique!
      googleid: "56",
      posts: [0, 1],
      networth: 1200,
      following: 40,
      followers: 15,
      profile_pic: null,
      date_joined: "11-15-2001",
    },
    {
      _id: 1,
      username: "jorgeorderique",
      googleid: "19",
      posts: [2],
      networth: 3500,
      following: 78,
      followers: 30,
      profile_pic: null,
      date_joined: "01-31-1997",
    },
  ],
  posts: [
    {
      _id: 0,
      owner_id: 0,
      post_name: "The Void",
      pixels: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      likes: 2000, // weakly increasing!! no affect if post unliked
      views: 5000,
      value: 25000,
      for_sale: true,
      tags: ["donda", "space", "nothing"],
    },
    {
      _id: 1,
      owner_id: 0,
      post_name: "Losing",
      pixels: [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ],
      likes: 1000,
      views: 3000,
      value: 13000,
      for_sale: false,
      tags: ["L", "loser"],
    },
    {
      _id: 2,
      owner_id: 0,
      post_name: "Bucket",
      pixels: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      likes: 300,
      views: 7000,
      value: 10000,
      for_sale: true,
      tags: ["bucket"],
    },
  ],
  likes: {
    _id: 0,
    user_id: 0,
    post_id: 2,
  },
};

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Art = require("./models/art");
const Follow = require("./models/follow");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
// const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// router.post("/initsocket", (req, res) => {
//   // do nothing if user not logged in
//   if (req.user)
//     socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
//   res.send({});
// });

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/user", (req, res) => {
  User.findById(req.query.user_id).then((user) => res.send(user));
});

router.get("/art", (req, res) => {
  Art.findById(req.query.art_id).then((art) => res.send(art));
});

router.post("/art", (req, res) => {
  // create new art
  const art = new Art({
    creator_id: req.user._id,
    owner_id: req.user._id,
    name: req.body.name,
    pixels: req.body.pixels,
    value: 0,
    likes: 0,
    views: 0,
    for_sale: req.body.for_sale,
    date_created: Date.now(),
  });

  art.save().then((art) => {
    // update creator's art list and netowrth before sending
    User.findOne({ _id: req.user._id }).then((user) => {
      user.art_owned.push(art._id);
      user.networth -= 1000;
      user.save();
    });
    res.send(art);
  });
});

router.get("/follow", (req, res) => {
  Follow.findOne(
    {
      follower_id: req.query.follower_id,
      following_id: req.query.following_id,
    },
    (err, follow) => {
      follow ? res.send(follow) : res.send([]);
    }
  );
});

router.post("/follow", (req, res) => {
  const follow = new Follow({
    follower_id: req.body.follower_id,
    following_id: req.body.following_id,
    _date: Date.now(),
  });
  //TODO: increment/decrement follower/following count for both users here and in /unfollow
  follow.save().then((follow) => {
    res.send(follow);
  });
});

router.post("/unfollow", (req, res) => {
  Follow.findOneAndDelete({
    follower_id: req.body.follower_id,
    following_id: req.body.following_id,
  }).then((follow) => {
    res.send(follow);
  });
});

//! test routes only!
router.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});

router.get("/arts", (req, res) => {
  Art.find({}).then((arts) => res.send(arts));
});

router.get("/follows", (req, res) => {
  Follow.find({}).then((follows) => res.send(follows));
});

router.get("/sheesh", (req, res) => {
  // User.findById(req.query.user_id).then((user) => {
  //   user.art_owned.push("61de4487c96b92559c18cd49");
  //   user.save();
  // });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
