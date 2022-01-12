const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  creator_id: String,
  name: String,
  owner_id: String,
  pixels: String, // ex: 0;1;1;1;0;0;0;0;1 -- 9x9 array
  value: Number,
  likes: Number,
  views: Number,
  for_sale: Boolean,
  date_created: Date,
});

// compile model from schema
module.exports = mongoose.model("art", ArtSchema);
