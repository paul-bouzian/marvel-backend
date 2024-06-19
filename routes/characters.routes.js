const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(
      `${process.env.MARVEL_API_URL}/characters?apiKey=${
        process.env.MARVEL_API_KEY
      }${name ? `&name=${name}` : ""}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
