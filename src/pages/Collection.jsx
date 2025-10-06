import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [savedCountries, setSavedCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(stored);
  }, []);

  if (savedCountries.length === 0) {
    return (
      <div className="collection-container">
        <h1>Saved Countries</h1>
        <p>You don't have any saved Countries yet.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="collection-container">
        <h1>Saved Countries</h1>

        <div className="collection-grid">
          {savedCountries.map((c) => (
            <article
              key={c.name}
              className="collection-card"
              onClick={() =>
                navigate(`/countries/${encodeURIComponent(c.name)}`)
              }
              aria-label={`Öppna ${c.name}`}
            >
              <img src={c.flag} alt={`Flag of ${c.name}`} />
              <p>{c.name}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const updated = savedCountries.filter(
                    (country) => country.name !== c.name
                  );
                  setSavedCountries(updated);
                  localStorage.setItem(
                    "savedCountries",
                    JSON.stringify(updated)
                  );
                }}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
