import React from "react";
import Display from "../components/Subscribers";
import withAuthentication from "../hoc/withAuthentication";

// Définition des champs pour la table 'livres' de la DB
const abonneFields = [
  { name: "prenom", label: "Prenom" },
  { name: "nom", label: "Nom" },
  { name: "ville", label: "Ville" },
  { name: "date_naissance", label: "Né(e) le :" },
  { name: "date_fin_abo", label: "Fin d'abonnement le:" },
];

function fetchAbonnes() {
  return (
    <>
      <h1>Section recherche Abonnes</h1>
      <Display fields={abonneFields}></Display>
    </>
  );
}

export default withAuthentication(fetchAbonnes);
