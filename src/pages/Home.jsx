import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Country Explorer</h1>

      <div className="home-buttons">
        <button onClick={() => navigate('/countries')}>Study countries</button>
        <button onClick={() => navigate('/collection')}>Collection</button>
        <button onClick={() => navigate('/quiz')}>Quiz</button>
        <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
      </div>
    </div>
  );
};

export default Home;