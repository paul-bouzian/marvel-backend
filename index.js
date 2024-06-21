require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const charactersRoutes = require("./routes/characters.routes");
const comicsRoutes = require("./routes/comics.routes");
const userRoutes = require("./routes/user.routes");
const favoritesRoutes = require("./routes/favorites.routes");

mongoose.connect(process.env.MONGODB_URI);

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
