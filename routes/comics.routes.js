const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  const { title, skip } = req.query;

  try {
    const requestUrl = `${process.env.MARVEL_API_URL}/comics?apiKey=${
      process.env.MARVEL_API_KEY
    }${title ? `&title=${title}` : ""}${skip ? `&skip=${skip}` : ""}`;

    const response = await axios.get(requestUrl);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response.status === 400) {
      return res.status(400).json({ message: "Bad request" });
    }
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

router.get("/comic/:id", async (req, res) => {
  const { id } = req.query;

  try {
    const requestUrl = `${process.env.MARVEL_API_URL}/comic/${id}?apiKey=${process.env.MARVEL_API_KEY}`;

    const response = await axios.get(requestUrl);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response.status === 400) {
      return res.status(400).json({ message: "Comic not found" });
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  const { characterId } = req.query;

  try {
    const requestUrl = `${process.env.MARVEL_API_URL}/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`;

    const response = await axios.get(requestUrl);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response.status === 400) {
      return res.status(400).json({ message: "Comics not found" });
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
