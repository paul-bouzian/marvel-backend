const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Une erreur s'est produite" });
  }
};

module.exports = isAuthenticated;
