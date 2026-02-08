const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// Créer un post
router.post("/", async (req, res) => {
  try {
    const { authorId, text, image } = req.body;
    const post = new Post({ author: authorId, text, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer tous les posts (fil global)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "username avatar");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Like / Unlike un post
router.post("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });

    const userId = req.body.userId;

    if (post.likes.includes(userId)) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
