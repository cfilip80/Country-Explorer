import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Collection from "./pages/Collection";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryName" element={<CountryDetails />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
