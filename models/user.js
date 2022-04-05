var mongoose = require("mongoose");

const whitelistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const whitelist = mongoose.model("whitelist", whitelistSchema);

module.exports = whitelist;
