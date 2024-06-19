const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  const { name, skip } = req.body;

  try {
    const requestUrl = `${process.env.MARVEL_API_URL}/characters?apiKey=${
      process.env.MARVEL_API_KEY
    }${name ? `&name=${name}` : ""}${skip ? `&skip=${skip}` : ""}`;

    const response = await axios.get(requestUrl);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
