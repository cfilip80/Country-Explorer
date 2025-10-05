import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({});

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");

    if (savedResults) {
      try {
        const resultsArray = JSON.parse(savedResults);

        const groupedByRegion = resultsArray.reduce((acc, curr) => {
          const { region, username, score } = curr;
          if (!acc[region]) {
            acc[region] = [];
          }
          acc[region].push({ username, score });
          return acc;
        }, {});

        setLeaderboardData(groupedByRegion);
      } catch (error) {
        console.error("Fel vid läsning av leaderboard data:", error);
        setLeaderboardData({});
      }
    }
  }, []);

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      {Object.keys(leaderboardData).length === 0 && (
        <p>Inga resultat hittades.</p>
      )}

      {Object.entries(leaderboardData).map(([region, players]) => (
        <div
          key={region}
          style={{
            marginBottom: "2rem",
            border: "0.5px dotted black",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <h2>{region}</h2>
          <table>
            <thead>
              <tr>
                <th>Användarnamn</th>
                <th>Poäng</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
