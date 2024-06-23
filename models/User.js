const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/djj10svfl/image/upload/v1719165553/test%40gmail.com/vujrxrgrdicfqwdtp126.jpg",
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
