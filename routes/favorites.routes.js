const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/favorites/comics", isAuthenticated, (req, res) => {
  const { comics } = req.user.favorites;
  res.status(200).json(comics);
});

router.get("/favorites/characters", isAuthenticated, (req, res) => {
  const { characters } = req.user.favorites;
  res.status(200).json(characters);
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

module.exports = router;
