const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database-access");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) throw err;
      res.status(201).send("Utilisateur créé avec succès");
    });
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
