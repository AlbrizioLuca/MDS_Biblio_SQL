const express = require("express");

const db = require("../database/database-access");
const router = express.Router();

router.get("/", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;
  const isExpired = req.query.isExpired || 0; // 0 = en cours, 1 = expiré
  const nom = req.query.nom || "";
  const prenom = req.query.prenom || "";
  const ville = req.query.ville || "";

  const sql = `SELECT id, prenom, nom, ville, DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance, CASE WHEN date_fin_abo <= CURRENT_DATE THEN 'expiré' ELSE 'en cours' END AS abonnement, DATE_FORMAT(date_fin_abo, '%d-%m-%Y') AS date_fin_abo 
    FROM abonne 
    WHERE LOWER(nom) LIKE LOWER('%${nom}%') AND LOWER(prenom) LIKE LOWER('%${prenom}%') AND LOWER(ville) LIKE LOWER('%${ville}%') 
    AND (CASE WHEN date_fin_abo <= CURRENT_DATE THEN 1 ELSE 0 END) = ${isExpired} 
    GROUP BY abonne.id 
    ORDER BY nom 
    LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = router;
