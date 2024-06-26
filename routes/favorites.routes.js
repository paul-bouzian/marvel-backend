const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const axios = require("axios");

router.get("/favorites/comics/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const comics = user.favorites.comics;

  try {
    const favorites = [];
    for (let id of comics) {
      const response = await axios.get(
        `${process.env.MARVEL_API_URL}/comic/${id}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      favorites.push(response.data);
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.get("/favorites/characters/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const characters = user.favorites.characters;

  try {
    const favorites = [];
    for (let id of characters) {
      const response = await axios.get(
        `${process.env.MARVEL_API_URL}/character/${id}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      favorites.push(response.data);
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.post("/favorites/comics", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;
    if (!id) {
      return res.status(400).json({ message: "L'id du comic est requis" });
    }
    if (!user.favorites.comics.includes(id)) {
      user.favorites.comics.push(id);
      await user.save();
      res.status(200).json(user.favorites.comics);
    } else {
      res.status(400).json({ message: "Le comic est déjà dans les favoris" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.post("/favorites/characters", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;
    if (!id) {
      return res.status(400).json({ message: "L'id du personnage est requis" });
    }
    if (!user.favorites.characters.includes(id)) {
      user.favorites.characters.push(id);
      await user.save();
      res.status(200).json(user.favorites.characters);
    } else {
      res
        .status(400)
        .json({ message: "Le personnage est déjà dans les favoris" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.delete("/favorites/comics", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;
    if (!id) {
      return res.status(400).json({ message: "L'id du comic est requis" });
    }
    const index = user.favorites.comics.indexOf(id);
    if (index !== -1) {
      user.favorites.comics.splice(index, 1);
      await user.save();
      res.status(200).json(user.favorites.comics);
    } else {
      res.status(400).json({ message: "Le comic n'est pas dans les favoris" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.delete("/favorites/characters", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;
    if (!id) {
      return res.status(400).json({ message: "L'id du personnage est requis" });
    }
    const index = user.favorites.characters.indexOf(id);
    if (index !== -1) {
      user.favorites.characters.splice(index, 1);
      await user.save();
      res.status(200).json(user.favorites.characters);
    } else {
      res
        .status(400)
        .json({ message: "Le personnage n'est pas dans les favoris" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
