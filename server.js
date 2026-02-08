// server.js - BSPACE backend complet
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json()); // permet de lire le JSON dans les requêtes

// Routes
app.use("/api/auth", authRoutes);

// Test route (vérifie que le serveur tourne)
app.get("/", (req, res) => {
  res.send("Bspace API is running 🚀");
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bspace server running on port ${PORT}`);
});
