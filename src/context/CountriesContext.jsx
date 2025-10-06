import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../utils/api";

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByRegion = useCallback(async (selectedRegion) => {
    setRegion(selectedRegion);
    if (!selectedRegion) {
      setCountries([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/region/${selectedRegion}?fields=name,flags`);
      setCountries(res.data || []);
    } catch (err) {
      setError(err?.message || "Något gick fel vid hämtning");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CountriesContext.Provider
      value={{ region, setRegion, countries, loading, error, fetchByRegion }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountries = () => useContext(CountriesContext);

export default CountriesContext;
