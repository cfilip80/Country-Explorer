import { useNavigate } from "react-router-dom";
import welcomeImage from "../assets/images/WorldMap.jpg";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      <h1>Country Explorer</h1>

      <div className="home-buttons">
        <button className="Btn" onClick={() => navigate("/countries")}>
          Study countries
        </button>
        <button className="Btn" onClick={() => navigate("/collection")}>
          Collection
        </button>
        <button className="Btn" onClick={() => navigate("/quiz")}>
          Quiz
        </button>
        <button className="Btn" onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Home;
