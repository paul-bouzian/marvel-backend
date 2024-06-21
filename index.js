require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const charactersRoutes = require("./routes/characters.routes");
const comicsRoutes = require("./routes/comics.routes");
const userRoutes = require("./routes/user.routes");
const favoritesRoutes = require("./routes/favorites.routes");

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(favoritesRoutes);
app.use(charactersRoutes);
app.use(comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
