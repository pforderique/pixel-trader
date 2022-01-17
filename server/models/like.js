const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user_id: String,
  art_id: String,
  _date: Date,
});

// compile model from schema
module.exports = mongoose.model("like", LikeSchema);
