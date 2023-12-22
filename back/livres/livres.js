const express = require("express");

const db = require("../database/database-access");
const router = express.Router();

router.get("/", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;
  const isAvailable = req.query.isAvailable || 0;
  const author = req.query.author || "";
  const publisher = req.query.publisher || "";
  const title = req.query.title || "";

  const sql = `SELECT livre.titre, auteur.nom AS auteur, editeur.nom AS editeur, DATE_FORMAT(MAX(emprunt.date_emprunt), '%d-%m-%Y') AS dernier_emprunt 
    FROM livre 
    JOIN auteur ON livre.id_auteur = auteur.id 
    JOIN editeur ON livre.id_editeur = editeur.id 
    JOIN emprunt ON livre.id = emprunt.id_livre 
    WHERE LOWER(livre.titre) LIKE LOWER('%${title}%') AND LOWER(auteur.nom) LIKE LOWER('%${author}%') AND LOWER(editeur.nom) LIKE LOWER('%${publisher}%') 
    AND( SELECT COUNT(*) > 0 FROM emprunt WHERE livre.id = emprunt.id_livre AND emprunt.date_retour IS NULL ) = ${isAvailable} 
    GROUP BY livre.id 
    ORDER BY livre.titre 
    LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = router;
