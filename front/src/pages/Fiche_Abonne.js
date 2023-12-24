import React, { useState, useEffect } from "react";
import LivresEmpruntes from "../components/Borrowed_Books";
import withAuthentication from "../hoc/withAuthentication";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Définition des champs pour la table 'livres' de la DB
const livreFields = [
  { name: "titre", label: "Titre" },
  { name: "auteur", label: "Auteur" },
  { name: "editeur", label: "Editeur" },
  { name: "date_emprunt", label: "Emprunté le:" },
];

function FicheAbonne() {
  const { id } = useParams();
  const [topFive, setTopFive] = useState({ categorie: "", livres: [] });

  useEffect(() => {
    // Effectuez la requête pour obtenir la catégorie préférée de l'abonné
    fetch(`http://localhost:5000/abonnes/${id}/top5`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setTopFive(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <h1> Fiche de l'abonné n° {id} </h1>
      <h3>Liste des livres empruntés</h3>
      <LivresEmpruntes fields={livreFields}></LivresEmpruntes>
      <h3>Suggestions: </h3>
      <span>La catégorie que vous lisez le plus est : {topFive.categorie}</span>
      <span>
        <ul>
          Voici pour vous la liste des livres les plus empruntés durant l'année
          dans la catégorie {topFive.categorie} :
          {/* {{topFive.livres}.map((livre, index) => (
            <li key={index}>{livre.titre}</li>
          ))} */}
        </ul>
      </span>
      <Link to="/abonnes">Retour vers la section abonnés</Link>
    </>
  );
}

export default withAuthentication(FicheAbonne);
