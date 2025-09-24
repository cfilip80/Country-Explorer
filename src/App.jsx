import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Collection from './pages/Collection';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:countryName" element={<CountryDetails />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default App;
