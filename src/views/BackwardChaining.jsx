import { useState, useEffect } from 'react';
import styles from './BackwardChaining.module.css';

const KNOWLEDGE_BASE = {
  "The Witcher": "💥 Action",
  "Stranger Things": "💥 Action",
  "Money Heist": "💥 Action",
  "Breaking Bad": "💥 Action",
  "The Office": "😂 Comedy",
  "Brooklyn Nine-Nine": "😂 Comedy",
  "Friends": "😂 Comedy",
  "Parks and Recreation": "😂 Comedy",
  "Our Planet": "🌍 Documentary",
  "Chef's Table": "🌍 Documentary",
  "Tiger King": "🌍 Documentary",
  "The Social Dilemma": "🌍 Documentary"
};

const QUESTIONS = [
  { question: "How's your energy level?", options: ["High", "Medium", "Low"] },
  { question: "Are you feeling stressed?", options: ["Yes", "No"] },
  { question: "Are you watching alone or with others?", options: ["Solo", "Group"] },
  { question: "How much time do you have?", options: ["Short", "Medium", "Long"] }
];

export default function BackwardChainingRecommender() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [derivedGenre, setDerivedGenre] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Reset everything
  const resetAll = () => {
    setSelectedMovie(null);
    setDerivedGenre(null);
    setUserResponses({});
    setProgress(0);
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    if (selectedMovie) {
      setDerivedGenre(KNOWLEDGE_BASE[selectedMovie]);
    }
  }, [selectedMovie]);

  if (!selectedMovie) {
    return (
      <div className={styles.movieSelection}>
        <h1 className={styles.title}>🎬 Choose a Movie</h1>
        <p className={styles.subtitle}>We'll determine your mood based on it!</p>
        
        <div className={styles.movieGrid}>
          {Object.keys(KNOWLEDGE_BASE).map(movie => (
            <div 
              key={movie} 
              className={styles.movieCard}
              onClick={() => setSelectedMovie(movie)}
            >
              <h3>{movie}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentQuestionIndex < QUESTIONS.length) {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    return (
      <div className={styles.questionFlow}>
        <h2 className={styles.analyzingTitle}>Let's Analyze Your Mood</h2>
        <h3>{currentQuestion.question}</h3>
        
        <div className={styles.answerOptions}>
          {currentQuestion.options.map(option => (
            <button
              key={option}
              className={styles.answerButton}
              onClick={() => {
                setUserResponses({ ...userResponses, [currentQuestion.question]: option });
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setProgress(((currentQuestionIndex + 1) / QUESTIONS.length) * 100);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
        >
          ↩️ Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.successTitle}>Your Movie Suggests You're in the Mood for:</h2>
      <h1 className={styles.genreName}>{derivedGenre}</h1>
      <p>Based on your choices, this genre suits your current mood!</p>
      
      <div className={styles.userChoices}>
        <h3>Your Choices:</h3>
        <ul>
          <li>🎥 Movie Picked: <strong>{selectedMovie}</strong></li>
          {Object.entries(userResponses).map(([question, answer]) => (
            <li key={question}>
              {question}: <strong>{answer}</strong>
            </li>
          ))}
        </ul>
      </div>
      
      <button 
        className={styles.restartButton}
        onClick={resetAll}
      >
        🔄 Start Over
      </button>
    </div>
  );
}
