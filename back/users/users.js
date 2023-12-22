const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database-access");
const router = express.Router();

//! Créer un nouveau user
router.post("/", async (req, res) => {
  const { email, password, role, id_abonne } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users ( email, password, role, id_abonne) VALUES (?, ?, ?, ?)";
    db.query(sql, [email, hashedPassword, role, id_abonne], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch {
    res.status(500).send();
  }
});

//! Récupérer TOUS les users
router.get("/", (req, res) => {
  const sql = "SELECT id, email, password, role, id_abonne FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//! Récupérer UN user via son id
router.get("/:id", (req, res) => {
  const sql =
    "SELECT id, email, password, role, id_abonne FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  });
});

//! Modifier UN user
router.patch("/:id", async (req, res) => {
  const { email, password, role, id_abonne } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "UPDATE users SET email = ?, password = ? , role = ? , id_abonne = ? WHERE id = ?";
    db.query(
      sql,
      [email, hashedPassword, role, id_abonne, req.params.id],
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch {
    res.status(500).send();
  }
});

//! Supprimer UN user
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
