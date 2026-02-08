const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router();

// Ajouter un commentaire
router.post("/:postId", async (req, res) => {
  try {
    const { authorId, text } = req.body;
    const comment = new Comment({ post: req.params.postId, author: authorId, text });
    await comment.save();

    // Mettre à jour le compteur de commentaires
    const post = await Post.findById(req.params.postId);
    post.commentsCount += 1;
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les commentaires d’un post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .populate("author", "username avatar");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
