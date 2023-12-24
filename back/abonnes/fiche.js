const express = require("express");

const db = require("../database/database-access");
const router = express.Router();

//! Récupération des emprunts pour un abonné spécifique
router.get("/:id/emprunts", (req, res) => {
  const idAbonne = req.params.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;
  const author = req.query.author || "";
  const publisher = req.query.publisher || "";
  const title = req.query.title || "";

  const sql = `SELECT livre.titre, auteur.nom AS auteur, editeur.nom AS editeur, DATE_FORMAT(emprunt.date_emprunt, '%d-%m-%Y') AS date_emprunt 
    FROM emprunt 
    JOIN livre ON emprunt.id_livre = livre.id 
    JOIN auteur ON livre.id_auteur = auteur.id 
    JOIN editeur ON livre.id_editeur = editeur.id 
    WHERE emprunt.id_abonne = ${idAbonne} 
    AND LOWER(livre.titre) LIKE LOWER('%${title}%') 
    AND LOWER(auteur.nom) LIKE LOWER('%${author}%') 
    AND LOWER(editeur.nom) LIKE LOWER('%${publisher}%') 
    ORDER BY emprunt.date_emprunt DESC 
    LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Trouve la catégorie la plus appréciée par l'abonné
router.get("/:id/top5", async (req, res) => {
  const idAbonne = req.params.id;
  console.log("top5 router");

  // D'abord, trouvez la catégorie préférée de l'abonné
  const sqlCategorie = `SELECT livre.categorie 
    FROM emprunt 
    JOIN livre ON emprunt.id_livre = livre.id 
    WHERE emprunt.id_abonne = ${idAbonne} 
    GROUP BY livre.categorie 
    ORDER BY COUNT(*) DESC 
    LIMIT 1`;

  db.query(sqlCategorie, [idAbonne], (err, results) => {
    console.log("sqlCategorie: ", sqlCategorie);

    if (err) throw err;

    const categoriePreferee = results[0].categorie;
    console.log("categoriePreferee: ", categoriePreferee);

    // Ensuite, retourne les 5 livres les plus empruntés dans cette catégorie sur une année
    const sqlTop5 = `SELECT livre.titre, COUNT(*) AS total_emprunts 
      FROM emprunt 
      JOIN livre ON emprunt.id_livre = livre.id 
      WHERE livre.categorie = ${categoriePreferee} 
      AND emprunt.date_emprunt >= date_sub(current_date, interval 1 year) 
      AND NOT EXISTS (
        SELECT 1 
        FROM emprunt e2 
        WHERE e2.id_livre = livre.id 
        AND e2.date_retour IS NULL
      ) 
      GROUP BY livre.titre 
      ORDER BY total_emprunts DESC 
      LIMIT 5`;

    db.query(sqlTop5, [categoriePreferee], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});

module.exports = router;
