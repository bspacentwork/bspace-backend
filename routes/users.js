const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Suivre un utilisateur
router.post("/follow/:id", async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      currentUser.following.push(userToFollow._id);

      await userToFollow.save();
      await currentUser.save();
    }

    res.json({ message: "Suivi effectué" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ne plus suivre un utilisateur
router.post("/unfollow/:id", async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser._id.toString());
    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow._id.toString());

    await userToUnfollow.save();
    await currentUser.save();

    res.json({ message: "Unfollow effectué" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
