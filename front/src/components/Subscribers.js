import React, { useState, useEffect } from "react";
import editIcon from "../img/editer.png";
import { useNavigate } from "react-router-dom";

const DisplayAbonnes = ({ fields }) => {
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // State pour l'ID sélectionné
  const [page, setPage] = useState(1); // State pour la pagination
  const [isExpired, setIsExpired] = useState(0); // State pour l'expiration de l'abonnement
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State pour le bouton
  const [nom, setNom] = useState(""); // State pour le nom
  const [prenom, setPrenom] = useState(""); // State pour le prénom
  const [ville, setVille] = useState(""); // State pour la ville
  const navigate = useNavigate(); // Récupération de la fonction navigate depuis le module react-router-dom

  const url = `http://localhost:5000/abonnes?page=${page}&limit=20&isExpired=${isExpired}&nom=${nom.trim()}&prenom=${prenom.trim()}&ville=${ville.trim()}`;

  useEffect(() => {
    if (isButtonClicked) {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [url, isButtonClicked]);

  const handleCheckboxChange = (event) => {
    setIsExpired(event.target.checked ? 1 : 0);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page > 1 ? page - 1 : page);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handleIconClick = () => {
    if (selectedId) {
      navigate(`/fiche-abonne/${selectedId}`);
    } else {
      alert("Veuillez sélectionner un abonné avant de cliquer sur l'icône.");
    }
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Prénom"
        onChange={(e) => setPrenom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom"
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ville"
        onChange={(e) => setVille(e.target.value)}
      />
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} />
        Abonnement expiré
      </label>
      <button onClick={handleButtonClick}>Rechercher</button>
      {isButtonClicked && (
        <>
          <table>
            <thead>
              <tr>
                <th></th> {/* Colonne pour les boutons radio */}
                {fields.map((field, index) => (
                  <th key={index}>{field.label}</th>
                ))}
                <th></th> {/* Colonne pour l'icône */}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="radio"
                        value={item.id}
                        checked={selectedId === item.id}
                        onChange={(e) => setSelectedId(Number(e.target.value))}
                      />
                    </td>
                    {fields.map((field, index) => {
                      let value = item[field.name];
                      return <td key={index}>{value}</td>;
                    })}
                    <td>
                      <img
                        src={editIcon}
                        alt="Update"
                        onClick={handleIconClick}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button onClick={prevPage}>Page précédente</button>{" "}
          <button onClick={nextPage}>Page suivante</button>{" "}
        </>
      )}
    </div>
  );
};

export default DisplayAbonnes;
