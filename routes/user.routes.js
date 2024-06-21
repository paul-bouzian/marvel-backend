const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
const isAuthenticated = require("../middlewares/isAuthenticated");
const cloudinary = require("cloudinary").v2;

const uuidv4 = require("uuid").v4;

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let avatar = null;
    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Email, mot de passe et nom d'utilisateur sont requis",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    const hash = await bcrypt.hash(password, 10);
    const token = uuidv4();

    // Si un fichier avatar est présent dans la requête
    if (req.files && req.files.avatar) {
      const file = req.files.avatar;
      const imageBase64 = `data:${file.mimetype};base64,${file.data.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(imageBase64, {
        folder: `${email}`,
      });
      avatar = result.secure_url;
    }

    const newUser = new User({
      email,
      password: hash,
      username,
      avatar:
        avatar ||
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      token,
    });
    await newUser.save();
    res.status(200).json({ message: "Utilisateur créé avec succès", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe sont requis",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Cet email n'est pas enregistré" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    res.status(200).json({ message: "Connexion réussie", token: user.token });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.get("/user", isAuthenticated, async (req, res) => {
  const userWithoutTokenAndPassword = req.user.toObject();
  delete userWithoutTokenAndPassword.password;
  delete userWithoutTokenAndPassword.token;
  res.status(200).json(userWithoutTokenAndPassword);
});
module.exports = router;
