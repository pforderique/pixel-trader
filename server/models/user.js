const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  art_owned: [String], // art ids
  networth: Number,
  following: Number,
  followers: Number,
  profile_pic: String, // link?
  date_joined: Date,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
