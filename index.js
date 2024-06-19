require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const charactersRoutes = require("./routes/characters.routes");
const comicsRoutes = require("./routes/comics.routes");

app.use(cors());
app.use(express.json());

app.use(charactersRoutes);
app.use(comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
