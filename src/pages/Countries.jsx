import React from "react";
import { useCountries } from "../context/CountriesContext";
import { useNavigate } from "react-router-dom";

const REGIONS = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

const Countries = () => {
  const { region, countries, loading, error, fetchByRegion } = useCountries();
  const navigate = useNavigate();

  const handleRegionChange = (e) => fetchByRegion(e.target.value);

  return (
    <div className="container">
      <div className="countries-container">
        <h1>Study countries</h1>

        <div style={{ margin: "1rem 0" }}>
          <label htmlFor="region-select" style={{ marginRight: "0.5rem" }}>
            Choose region:
          </label>
          <select
            id="region-select"
            className="region-select"
            value={region}
            onChange={handleRegionChange}
          >
            <option value="">-- Välj --</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {loading && <p>Hämtar länder…</p>}
        {error && <p style={{ color: "salmon" }}>{error}</p>}

        <div className="countries-grid">
          {countries.map((c) => {
            const countryName = c.name?.common || "Unknown";
            const flag = c.flags?.png || c.flags?.svg || "";

            return (
              <article
                key={countryName}
                onClick={() =>
                  navigate(`/countries/${encodeURIComponent(countryName)}`)
                }
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  padding: "0.4rem",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
                aria-label={`Gå till ${countryName}`}
              >
                <div
                  style={{
                    minHeight: "100px",
                    overflow: "hidden",
                    borderRadius: "6px",
                  }}
                >
                  <img
                    src={flag}
                    alt={`Flag of ${countryName}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <p
                  style={{
                    marginTop: "0.6rem",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {countryName}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Countries;
