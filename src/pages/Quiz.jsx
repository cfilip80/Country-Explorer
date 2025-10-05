import React, { useState } from "react";

const REGIONS = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

const Quiz = () => {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = async () => {
    if (!username.trim() || !region) {
      alert("Fyll i både användarnamn och region");
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}?fields=name,flags`
      );
      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 15);
      setQuestions(selected);
      setQuizStarted(true);
    } catch (error) {
      alert("Kunde inte hämta frågor. Försök igen senare.");
    }
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const correctName = questions[currentIndex].name.common.toLowerCase();
    const guess = userAnswer.trim().toLowerCase();

    if (guess === correctName) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Rätt!");
    } else {
      setFeedback(
        `❌ Fel! Rätt svar var: ${questions[currentIndex].name.common}`
      );
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");

      const nextIndex = currentIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
      } else {
        setShowResult(true);
        saveResult();
      }
    }, 1500);
  };

  const saveResult = () => {
    const newResult = {
      username,
      region,
      score,
      timestamp: Date.now(),
    };

    const stored = JSON.parse(localStorage.getItem("quizResults")) || [];
    stored.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(stored));
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h1>Countries Quiz</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Choose region</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2>Quiz finished!</h2>
        <p>
          {username}, you got {score} out of 15 right answers.
        </p>
        <button onClick={() => window.location.reload()}>Restart quiz</button>
      </div>
    );
  }

  const currentFlag = questions[currentIndex].flags.png;
  const questionNumber = currentIndex + 1;

  return (
    <div className="quiz-container">
      <h2>Question {questionNumber} out of 15</h2>
      <p>Which Country does this flag belong to?</p>
      <img
        src={currentFlag}
        alt="Flagga"
        style={{
          width: "200px",
          height: "auto",
          margin: "1rem 0",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
        }}
      />

      <input
        type="text"
        placeholder="Skriv landets namn"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button onClick={handleSubmit}>Submit answer</button>

      {feedback && (
        <p
          style={{
            marginTop: "1rem",
            fontWeight: "bold",
            color: feedback.startsWith("✅") ? "lightgreen" : "salmon",
          }}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Quiz;
