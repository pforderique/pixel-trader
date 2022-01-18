/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const UPDATE_FREQ = 1000 * 60 * 1; // 1 min
const ART_START_VALUE = 200; // 200 VC

const express = require("express");
const mongoose = require("mongoose");

// import models so we can interact with the database
const Art = require("./models/art");
const Follow = require("./models/follow");
const Like = require("./models/like");
const User = require("./models/user");

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

// API methods
router.get("/user", (req, res) => {
  User.findById(req.query.user_id)
    .then((user) => res.send(user))
    .catch((err) => res.send({ _id: null }));
});

router.get("/art", (req, res) => {
  Art.findById(req.query.art_id)
    .then((art) => {
      if (Date.now() - art.date_updated > UPDATE_FREQ) {
        art.date_updated = Date.now();
        art.last_value = art.value;
        art.save().then((art) => res.send(art));
      } else {
        res.send(art);
      }
    })
    .catch((err) => res.send({ _id: null }));
});

router.get("/arts", (req, res) => {
  Art.find({
    _id: {
      $in: req.query.art_ids
        .split(";")
        .map((idd) => mongoose.Types.ObjectId(idd)),
    },
  }).then((result) => {
    for (const art of result) {
      if (Date.now() - art.date_updated > UPDATE_FREQ) {
        Art.findById(art._id).then((a) => {
          a.date_updated = Date.now();
          a.last_value = a.value;
          a.save();
        });
      }
    }
    res.send(result);
  });
});

router.post("/art", (req, res) => {
  // create new art
  const art = new Art({
    creator_id: req.user._id,
    owner_id: req.user._id,
    name: req.body.name,
    pixels: req.body.pixels,
    value: ART_START_VALUE,
    last_value: ART_START_VALUE,
    likes: 0,
    views: 0,
    for_sale: req.body.for_sale,
    date_created: Date.now(),
    date_updated: Date.now(),
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
  Follow.findOne({
    follower_id: req.query.follower_id,
    following_id: req.query.following_id,
  }).then((follow) => {
    follow ? res.send(follow) : res.send({ _id: null });
  });
});

router.post("/follow", (req, res) => {
  const follow = new Follow({
    follower_id: req.body.follower_id,
    following_id: req.body.following_id,
    _date: Date.now(),
  });
  follow.save();

  // increment following count on follower user
  User.findByIdAndUpdate(req.body.follower_id, {
    $inc: { following: 1 },
  }).exec();

  // increment follower count on followed user
  User.findByIdAndUpdate(
    req.body.following_id,
    { $inc: { followers: 1 } },
    { new: true }, // return the updated user instead
    (e, user) => {
      res.send(user);
    }
  );
});

router.post("/unfollow", (req, res) => {
  Follow.findOneAndDelete({
    follower_id: req.body.follower_id,
    following_id: req.body.following_id,
  }).exec();

  // decrement following count on follower user
  User.findByIdAndUpdate(req.body.follower_id, {
    $inc: { following: -1 },
  }).exec();

  // decrement follower count on followed user
  User.findByIdAndUpdate(
    req.body.following_id,
    { $inc: { followers: -1 } },
    { new: true }, // return the updated user instead
    (e, user) => {
      res.send(user);
    }
  );
});

router.get("/like", (req, res) => {
  Like.findOne({
    user_id: req.query.user_id,
    art_id: req.query.art_id,
  }).then((like) => {
    like ? res.send(like) : res.send({ _id: null });
  });
});

router.post("/like", (req, res) => {
  // create new like object
  const newLike = new Like({
    user_id: req.body.user_id,
    art_id: req.body.art_id,
    _date: Date.now(),
  });

  newLike.save();

  // update like count on post
  Art.findById(req.body.art_id).then((art) => {
    art.likes += 1;
    art.save().then((a) => res.send(a));
  });
});

router.post("/unlike", (req, res) => {
  Like.findOneAndDelete({
    user_id: req.body.user_id,
    art_id: req.body.art_id,
  }).then((follow) => {
    // update like count on post
    Art.findById(req.body.art_id).then((art) => {
      art.likes -= 1;
      art.save().then((a) => res.send(a));
    });
  });
});

router.post("/art/increment", (req, res) => {
  Art.findById(req.body.art_id).then((a) => {
    a.views += Number(req.body.views);
    a.value += Number(req.body.value);
    a.save().then((a) => res.send(a));
  });
});

router.post("/art/delete", (req, res) => {
  Art.findByIdAndDelete(req.body.art_id).then((a) => {
    // Remove art id from owners list
    User.findById(a.owner_id).then((user) => {
      const idx = user.art_owned.indexOf(a._id);
      user.art_owned.splice(idx, 1);
      user.save();
    });

    // remove all likes the post had in the database
    Like.deleteMany({ art_id: a._id.toString() }).then((mes) => res.send(mes));
  });
});

router.post("/art/purchase", (req, res) => {
  Art.findById(req.body.art_id).then((a) => {
    // update previous owners art id list
    User.findById(a.owner_id).then((prev_owner) => {
      const idx = prev_owner.art_owned.indexOf(a._id);
      prev_owner.art_owned.splice(idx, 1);
      prev_owner.networth += Number(a.value);
      prev_owner.save();
    });

    // update new owners art id list
    User.findById(req.body.new_owner_id).then((new_owner) => {
      new_owner.art_owned.push(a._id);
      new_owner.networth -= Number(a.value);
      new_owner.save();
    });

    // update new owner id in art document
    a.owner_id = req.body.new_owner_id;
    a.save().then((updated_art) => res.send(updated_art));
  });
});

router.get("/art/trending", (req, res) => {
  const count = req.query.count ? Number(req.query.count) : 6;

  // return {count} "trending" art
  // trending measured by views for now
  Art.find({})
    .sort({ views: -1 })
    .limit(count)
    .then((results) => {
      res.send(results);
    });
});

router.get("/art/following", (req, res) => {
  if (!req.user) return res.send([]);

  const count = req.query.count ? Number(req.query.count) : 6;

  // get list of all follow objs where logged in user is the following user
  Follow.find({ follower_id: req.user._id }).then((follows) => {
    let popular_art = [];
    let promises = [];
    for (const f of follows) {
      promises.push(
        Art.find({ owner_id: f.following_id })
          .sort({ views: -1 })
          .limit(3) // limit 3 arts from each user followed
          .then((arts) => {
            popular_art.push(...arts);
          })
      );
    }

    // populate list of most popular pics
    Promise.all(promises).then((result) => {
      // sort by views DEC
      popular_art.sort((art1, art2) => art2.views - art1.views);

      // return first {count} elements
      res.send(popular_art.splice(0, count));
    });
  });
});

router.get("/search", (req, res) => {
  // use regex to search for alike documents
  const query = { name: { $regex: ".*" + req.query.q + ".*", $options: "i" } };

  // wait for all asynchronous requests to complete before sending
  Promise.all([
    User.find(query).limit(6).exec(),
    Art.find(query).limit(12).exec(),
  ]).then((results) => {
    res.send({ users: results[0], arts: results[1] });
  });
});

//! test routes only!
router.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});

router.get("/allarts", (req, res) => {
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
