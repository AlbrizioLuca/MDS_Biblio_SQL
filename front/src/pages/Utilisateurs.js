import React, { useState } from "react";
import CRUD from "../components/Users";
import withAuthentication from "../hoc/withAuthentication";

// Définit les REGEX pour la validation des champs
const patterns = {
  name: "^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$",
  string: "^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$",
  email: "^\\w[\\w.-_]*@\\w[\\w.-_]*(?:\\.\\w[\\w-]*)+$",
  password:
    "^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\\d@$!%*?&.]{8,}$",
};

// Définition des champs pour chaque table de la DB
const fieldsByParam = {
  users: [
    { name: "email", label: "Email", pattern: patterns.email },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      pattern: patterns.password,
    },
    {
      name: "role",
      label: "Rôle",
      type: "select",
      options: [
        { value: "abonne", label: "abonne" },
        { value: "gestionnaire", label: "gestionnaire" },
        { value: "admin", label: "admin" },
      ],
    },
  ],
};
function DisplayCRUD() {
  // Hook useState pour gérer l'état du paramètre
  const [param, setParam] = useState(Object.keys(fieldsByParam)?.[0] ?? "");
  // Récupère les champs en fonction du param
  const fields = fieldsByParam?.[param] ?? [];

  // Rendu du composant
  return (
    <>
      <h1> Liste des utilisateurs et rôles</h1>
      <CRUD
        param={param}
        fields={fields}
        setParam={setParam}
        fieldsByParam={fieldsByParam}
      ></CRUD>
    </>
  );
}

export default withAuthentication(DisplayCRUD);
