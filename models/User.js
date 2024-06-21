const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: {
    comics: {
      type: [String],
      default: [],
    },
    characters: {
      type: [String],
      default: [],
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
