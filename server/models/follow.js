const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  follower_id: String,
  following_id: String,
  _date: Date,
});

// compile model from schema
module.exports = mongoose.model("follow", FollowSchema);
