import React, { useState } from 'react';
import styles from './forwardchaining.module.css';

// Main component for the show recommendation engine
export default function ShowRecommendationEngine() {
  // State to track user preferences for mood factors
  const [moodFactors, setMoodFactors] = useState({
    energy: null,
    stress: null,
    genre: null,
    time: null,
    depth: null,
    music: null,
    goal: null,
    mood: null,
    socialPreference: null,
    complexity: null,
    humor: null, // New factor
    nostalgia: null, // New factor
    visualEffects: null, // New factor
    languagePreference: null // New factor
  });

  // Database of shows categorized by genres with images
  const SHOW_DATABASE = {
    "💥 High-Intensity Action": [
      { name: "The Mandalorian", image: "https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg" },
      { name: "Jack Ryan", image: "https://m.media-amazon.com/images/M/MV5BNDk3N2I1NzAtY2FmMS00Y2Y0LTljYWEtYjU1OTVjYTI4Y2JlXkEyXkFqcGdeQXVyNDY2MjcyOTQ@._V1_.jpg" },
      { name: "Daredevil", image: "https://m.media-amazon.com/images/M/MV5BODcwOTg2MDE3NF5BMl5BanBnXkFtZTgwNTUyNTY1NjM@._V1_.jpg" },
      { name: "John Wick", image: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" },
      { name: "Mission Impossible", image: "https://m.media-amazon.com/images/M/MV5BMTk3NDY5MTU0NV5BMl5BanBnXkFtZTgwNDI3MDE1NTM@._V1_.jpg" }
    ],
    "🚀 Mind-Bending Sci-Fi": [
      { name: "Westworld", image: "https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcwM2EyMzA3XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
      { name: "Stranger Things", image: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Black Mirror", image: "https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "The Expanse", image: "https://m.media-amazon.com/images/M/MV5BZDVmMDljM2QtZDkzZC00ZDg2LWFiMGItZjNiNjliZjg2MGEzXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg" },
      { name: "Devs", image: "https://m.media-amazon.com/images/M/MV5BNzVkMjY0MTYtMjMxMy00MWE5LWI1NTEtYjU5MDQ0YTRiYjAzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" }
    ],
    "🎭 Complex Drama": [
      { name: "Succession", image: "https://m.media-amazon.com/images/M/MV5BZDE0ODVlYjktNjJiMC00ODk4LWIwNTktMWRhZmZiOGFhYmYwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Breaking Bad", image: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg" },
      { name: "The Crown", image: "https://m.media-amazon.com/images/M/MV5BZTEyNjBjZDYtNWY1MC00OThiLTkxN2ItNGQwYWY3Y2JiYzM4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Better Call Saul", image: "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg" },
      { name: "Mr. Robot", image: "https://m.media-amazon.com/images/M/MV5BMzgxMmQxZjQtNDdmMC00MjRlLTk1MDEtZDcwNTdmOTg0YzA2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg" }
    ],
    "💘 Emotional Romance": [
      { name: "Bridgerton", image: "https://m.media-amazon.com/images/M/MV5BYjExYTcwYmYtMWY2Zi00MGJlLTk3YjUtZTU1Zjg4MDc0Y2FjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg" },
      { name: "Normal People", image: "https://m.media-amazon.com/images/M/MV5BNzMzYmRiNGEtMDg5OC00OGZmLWFmNDktYzRlZTFkZmZiMjAzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Outlander", image: "https://m.media-amazon.com/images/M/MV5BMjE0MDkzMDQwOF5BMl5BanBnXkFtZTgwOTE1Mjg1MzE@._V1_.jpg" },
      { name: "This Is Us", image: "https://m.media-amazon.com/images/M/MV5BNzY1YWQzMDgtOTU5MC00YmY3LThmNWItODA3YzhiZDNlNWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Virgin River", image: "https://m.media-amazon.com/images/M/MV5BMTY5OTk2NjYwM15BMl5BanBnXkFtZTgwMDUyNjE4NjM@._V1_.jpg" }
    ],
    "😂 Light Comedy": [
      { name: "The Office", image: "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg" },
      { name: "Brooklyn Nine-Nine", image: "https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_.jpg" },
      { name: "Parks and Rec", image: "https://m.media-amazon.com/images/M/MV5BMjA5MjUxNDgwNF5BMl5BanBnXkFtZTgwMDk5NjM5ODE@._V1_.jpg" },
      { name: "Ted Lasso", image: "https://m.media-amazon.com/images/M/MV5BMDVmODUzNmEtMGMxZC00NWUzLTkxMTAtMDM5OTQzMWE0ZDM3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" },
      { name: "Schitt's Creek", image: "https://m.media-amazon.com/images/M/MV5BNWQ1ZmM3MTQtNTVhZC00MWVlLWI5ZjgtYmZiYWQxZjUzZWM0XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg" }
    ],
    "🤣 Dark Comedy": [
      { name: "Fleabag", image: "https://m.media-amazon.com/images/M/MV5BMjA4MzU5NzQxNV5BMl5BanBnXkFtZTgwOTg3MDA5NzM@._V1_.jpg" },
      { name: "Barry", image: "https://m.media-amazon.com/images/M/MV5BMzE0ODk0NjM4N15BMl5BanBnXkFtZTgwNTQ5MjE1NDM@._V1_.jpg" },
      { name: "Atlanta", image: "https://m.media-amazon.com/images/M/MV5BOTk1NzQwMzQtMWYwMS00NmM1LThiZDMtMWNkYzJjNDg1Njg5XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" },
      { name: "Bojack Horseman", image: "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "What We Do in the Shadows", image: "https://m.media-amazon.com/images/M/MV5BNjY1N2I2MGItM2MwNC00ZTRlLThjOTgtZjA1NDJiZTVlOTEwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" }
    ],
    "🎨 Innovative Animation": [
      { name: "Arcane", image: "https://m.media-amazon.com/images/M/MV5BYmU5OWM5ZTAtNjUzOC00NmUyLTgyOWMtMjlkNjdlMDAzMzU1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" },
      { name: "Love, Death & Robots", image: "https://m.media-amazon.com/images/M/MV5BMTc1MjIyNDI3Nl5BMl5BanBnXkFtZTgwMjQ1OTI0NzM@._V1_.jpg" },
      { name: "BoJack Horseman", image: "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Rick and Morty", image: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg" },
      { name: "Castlevania", image: "https://m.media-amazon.com/images/M/MV5BNzU4NmNjNmItMGE4MC00NTFhLThlY2UtODJkYzYyMDE2OTQ5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" }
    ],
    "🌍 Thought-Provoking Documentaries": [
      { name: "Our Planet", image: "https://m.media-amazon.com/images/M/MV5BN2I1ZjA5YWItZjIzNS00MTliLThhM2UtZWY5ZTUyMGQxNWY4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "The Social Dilemma", image: "https://m.media-amazon.com/images/M/MV5BZjJjZTBkZDQtYjVkZS00ZGY5LTlkOTMtYWVlYWVkYjZlMGQyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Tiger King", image: "https://m.media-amazon.com/images/M/MV5BZTA0Y2U1OGYtMWVjYi00YzUxLWE0YTAtY2QyYjU0OTY0YWE2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Making a Murderer", image: "https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2ODM5NzE@._V1_.jpg" },
      { name: "Planet Earth", image: "https://m.media-amazon.com/images/M/MV5BNmZlYzIzMTItY2EzYS00YTEyLTg0ZjEtMDMzZjM3ODdhN2UzXkEyXkFqcGdeQXVyNjI0MDg2NzE@._V1_.jpg" }
    ],
    "🏆 Epic Competitive": [
      { name: "The Last Dance", image: "https://m.media-amazon.com/images/M/MV5BY2U1ZTU4OWItNGU2MC00MTg1LTk4NzUtYTk3ODhjYjI0MzlmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Drive to Survive", image: "https://m.media-amazon.com/images/M/MV5BMzVkMGU0YWMtZjQzNC00YzQwLWJhMWItMWYzNjM0MmU5YTY4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
      { name: "Chef's Table", image: "https://m.media-amazon.com/images/M/MV5BMjE3MDQ2OTYyN15BMl5BanBnXkFtZTgwNjQ0NzgxNzM@._V1_.jpg" },
      { name: "Ultimate Beastmaster", image: "https://m.media-amazon.com/images/M/MV5BZjY2YjYxY2MtYjdkYy00YjU0LWI4NDctYzQ5YzQwYjY0ZWE5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" }
    ]
  };

  // Function to render a question with options for user input
  const askQuestion = (factor, questionText, options) => {
    return (
      <div className={styles.questionContainer}>
        <div className={styles.questionBox}>
          <div className={styles.questionHeader}>
            <h3>{questionText}</h3>
          </div>
          <div className={styles.optionsGrid}>
            {options.map(option => (
              <button 
                key={option}
                className={styles.optionButton}
                onClick={() => setMoodFactors({ ...moodFactors, [factor]: option })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Function to determine recommendations using backward chaining
  const backwardChain = () => {
    const goals = [
      { name: "Relaxation", conditions: { stress: "Yes", mood: "Calm" } },
      { name: "Entertainment", conditions: { stress: "No", energy: "Yes", goal: "Entertainment" } },
      { name: "Thought-Provoking", conditions: { depth: "Yes" } },
      { name: "Music-Focused", conditions: { music: "Yes" } }
    ];

    // Check which goal matches the current mood factors
    const matchedGoal = goals.find(goal => {
      return Object.entries(goal.conditions).every(([key, value]) => moodFactors[key] === value);
    });

    if (matchedGoal) {
      // Generate recommendations based on the matched goal
      let recommendations = [];
      let reasoning = [];

      switch (matchedGoal.name) {
        case "Relaxation":
          recommendations = [
            ...SHOW_DATABASE["🌍 Thought-Provoking Documentaries"],
            ...SHOW_DATABASE["💘 Emotional Romance"]
          ];
          reasoning.push("Relaxation goal matched with calm mood and high stress.");
          break;
        case "Entertainment":
          recommendations = [
            ...SHOW_DATABASE["💥 High-Intensity Action"],
            ...SHOW_DATABASE["🚀 Mind-Bending Sci-Fi"],
            ...SHOW_DATABASE["🏆 Epic Competitive"]
          ];
          reasoning.push("Entertainment goal matched with low stress and high energy.");
          break;
        case "Thought-Provoking":
          recommendations = [
            ...SHOW_DATABASE["🎭 Complex Drama"],
            ...SHOW_DATABASE["🌍 Thought-Provoking Documentaries"]
          ];
          reasoning.push("Thought-provoking content matched with preference for depth.");
          break;
        case "Music-Focused":
          recommendations = [
            ...SHOW_DATABASE["🎨 Innovative Animation"]
          ];
          reasoning.push("Music-focused content matched with preference for good soundtracks.");
          break;
        default:
          break;
      }

      // Remove duplicates, randomize, and limit to 3 shows
      recommendations = [...new Set(recommendations)];
      recommendations = recommendations.sort(() => Math.random() - 0.5).slice(0, 3);

      return (
        <div className={styles.recommendationContainer}>
          <div className={styles.recommendationsGrid}>
            {recommendations.map((show) => (
              <div className={styles.showCard} key={show.name}>
                <div className={styles.showImageContainer}>
                  <img 
                    src={show.image} 
                    alt={show.name} 
                    className={styles.showImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                    }}
                  />
                </div>
                <h3>{show.name}</h3>
                <button className={styles.watchButton}>Watch Now</button>
              </div>
            ))}
          </div>
          <div className={styles.reasoningBox}>
            <h3>How we chose these:</h3>
            <p>{reasoning.join(". ") + "."}</p>
          </div>
          <button 
            class={styles.restartButton}
            onClick={() => setMoodFactors({
              energy: null,
              stress: null,
              genre: null,
              time: null,
              depth: null,
              music: null,
              goal: null,
              mood: null,
              socialPreference: null,
              complexity: null,
              humor: null,
              nostalgia: null,
              visualEffects: null,
              languagePreference: null
            })}
          >
            Start Over
          </button>
        </div>
      );
    }

    // Find the first unanswered factor and ask the corresponding question
    const unansweredFactor = Object.keys(moodFactors).find(key => moodFactors[key] === null);

    if (unansweredFactor) {
      const questionMap = {
        stress: 'Are you feeling stressed? 🧠',
        mood: 'How would you describe your current mood?',
        energy: 'Are you feeling energetic today? ⚡',
        goal: 'Are you looking to relax or be entertained? 🎯',
        depth: 'Do you prefer deep, thought-provoking content? 🧐',
        music: 'Is good music/soundtrack important to you? 🎧'
      };

      const optionsMap = {
        stress: ['Yes', 'No'],
        mood: ['Calm', 'Energetic', 'Neutral'],
        energy: ['Yes', 'No'],
        goal: ['Relaxation', 'Entertainment'],
        depth: ['Yes', 'No'],
        music: ['Yes', 'No']
      };

      return askQuestion(unansweredFactor, questionMap[unansweredFactor], optionsMap[unansweredFactor]);
    }

    return <p>No recommendations available. Please restart.</p>;
  };

  // Render the main application
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>🎬 Advanced Mood-Based Show Recommender</h1>
        <p>A comprehensive journey to find your perfect show</p>
      </header>
      <main>
        {backwardChain()}
      </main>
    </div>
  );
}