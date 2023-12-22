import React from "react";
import Display from "../components/Books";
import withAuthentication from "../hoc/withAuthentication";

// Définition des champs pour la table 'livres' de la DB
const livreFields = [
  { name: "titre", label: "Titre" },
  { name: "auteur", label: "Auteur" },
  { name: "editeur", label: "Editeur" },
  { name: "dernier_emprunt", label: "Dernier emprunt le:" },
];

function fetchLivres() {
  return (
    <>
      <h1>Section recherche Livres</h1>
      <Display fields={livreFields}></Display>
    </>
  );
}

export default withAuthentication(fetchLivres);
