const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  const { title, skip } = req.body;

  try {
    const requestUrl = `${process.env.MARVEL_API_URL}/comics?apiKey=${
      process.env.MARVEL_API_KEY
    }${title ? `&title=${title}` : ""}${skip ? `&skip=${skip}` : ""}`;

    const response = await axios.get(requestUrl);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
