import React, { useState, useEffect } from "react";

const DisplayLivres = ({ fields }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // State pour la pagination
  const [isAvailable, setIsAvailable] = useState(0); // State pour la disponibilité
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State pour le bouton
  const [author, setAuthor] = useState(""); // State pour l'auteur
  const [publisher, setPublisher] = useState(""); // State pour l'éditeur
  const [title, setTitle] = useState(""); // State pour le titre

  const url = `http://localhost:5000/livres?page=${page}&limit=20&isAvailable=${isAvailable}&author=${author.trim()}&publisher=${publisher.trim()}&title=${title.trim()}`;

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
    setIsAvailable(event.target.checked ? 1 : 0);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page > 1 ? page - 1 : page);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Titre"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Auteur"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Éditeur"
        onChange={(e) => setPublisher(e.target.value)}
      />
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} />
        Disponible
      </label>
      <button onClick={handleButtonClick}>Rechercher</button>
      {isButtonClicked && (
        <>
          <table>
            <thead>
              <tr>
                {fields.map((field, index) => (
                  <th key={index}>{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <tr key={index}>
                    {fields.map((field, index) => {
                      let value = item[field.name];
                      return <td key={index}>{value}</td>;
                    })}
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

export default DisplayLivres;
