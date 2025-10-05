import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/name/${countryName}?fullText=true`);
        setCountry(res.data[0]);
      } catch (err) {
        setError("Kunde inte hämta landets information.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  const handleSave = () => {
    if (!country) return;

    const saved = JSON.parse(localStorage.getItem("savedCountries")) || [];
    const exists = saved.find((c) => c.name === country.name.common);

    if (!exists) {
      saved.push({
        name: country.name.common,
        flag: country.flags?.png || country.flags?.svg || "",
      });
      localStorage.setItem("savedCountries", JSON.stringify(saved));
      alert(`${country.name.common} sparades i din samling!`);
    } else {
      alert(`${country.name.common} finns redan i din samling.`);
    }
  };

  if (loading)
    return (
      <div className="country-details-container">
        <p>Hämtar data…</p>
      </div>
    );
  if (error)
    return (
      <div className="country-details-container">
        <p style={{ color: "salmon" }}>{error}</p>
      </div>
    );
  if (!country)
    return (
      <div className="country-details-container">
        <p>Inget land hittades.</p>
      </div>
    );

  const flag = country.flags?.png || country.flags?.svg || "";
  const name = country.name?.common || "Okänt";
  const population = country.population?.toLocaleString() || "Okänd";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "Okänd";
  const mapsUrl = country.maps?.googleMaps || "#";

  return (
    <div className="country-details-container">
      <img
        src={flag}
        alt={`${name} flag`}
        style={{ width: "200px", borderRadius: "8px" }}
      />
      <h1>{name}</h1>
      <p>
        <strong>Befolkning:</strong> {population}
      </p>
      <p>
        <strong>Valuta:</strong> {currencies}
      </p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: "1rem", display: "inline-block" }}
      >
        Visa på Google Maps
      </a>
      <button onClick={handleSave} style={{ marginTop: "1rem" }}>
        Spara land
      </button>
    </div>
  );
};

export default CountryDetails;
