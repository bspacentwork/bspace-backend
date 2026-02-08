// server.js - Backend complet Bspace
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import des routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON dans toutes les requêtes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// Test route simple
app.get("/", (req, res) => {
  res.send("Bspace API is running 🚀");
});

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bspace server running on port ${PORT}`);
});
