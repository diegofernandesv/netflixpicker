import React, { useState } from 'react';
import styles from './forwardchaining.module.css';

export default function ShowRecommendationEngine() {
  // Expanded mood factors state
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

  // Expanded show database with images
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

  // Question component (unchanged)
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

  // Updated generateRecommendations to work with new SHOW_DATABASE structure
  const generateRecommendations = () => {
    let recommendations = [];
    let reasoning = [];

    // Convert SHOW_DATABASE to array of show objects for easier processing
    const allShows = Object.values(SHOW_DATABASE).flat();

    // Primary Decision Tree: Stress Level
    if (moodFactors.stress === "Yes") {
      if (moodFactors.mood === "Calm") {
        // High Stress + Calm Mood
        recommendations = [
          ...SHOW_DATABASE["🌍 Thought-Provoking Documentaries"],
          ...SHOW_DATABASE["💘 Emotional Romance"]
        ];
        reasoning.push("High stress and calm mood suggest soothing, introspective content");
      } else if (moodFactors.mood === "Energetic") {
        // High Stress + Energetic Mood
        recommendations = [
          ...SHOW_DATABASE["😂 Light Comedy"],
          ...SHOW_DATABASE["🎨 Innovative Animation"]
        ];
        reasoning.push("High stress and energetic mood point to uplifting, distracting shows");
      } else if (moodFactors.mood === "Neutral") {
        // High Stress + Neutral Mood
        recommendations = [
          ...SHOW_DATABASE["🤣 Dark Comedy"],
          ...SHOW_DATABASE["🎭 Complex Drama"]
        ];
        reasoning.push("High stress and neutral mood suggest nuanced, engaging content");
      }
    } else if (moodFactors.stress === "No") {
      // Nested Decision Tree for Low Stress Scenarios
      if (moodFactors.energy === "Yes") {
        if (moodFactors.goal === "Entertainment") {
          // Low Stress + High Energy + Entertainment
          recommendations = [
            ...SHOW_DATABASE["💥 High-Intensity Action"],
            ...SHOW_DATABASE["🚀 Mind-Bending Sci-Fi"],
            ...SHOW_DATABASE["🏆 Epic Competitive"]
          ];
          reasoning.push("Low stress, high energy, and entertainment goal suggest thrilling content");
        } else if (moodFactors.goal === "Relaxation") {
          // Low Stress + High Energy + Relaxation
          recommendations = [
            ...SHOW_DATABASE["🤣 Dark Comedy"],
            ...SHOW_DATABASE["🎨 Innovative Animation"]
          ];
          reasoning.push("Low stress, high energy, but seeking relaxation points to clever, engaging shows");
        }
      } else if (moodFactors.energy === "No") {
        // Genre and Social Preference Considerations
        if (moodFactors.genre === "Action") {
          if (moodFactors.socialPreference === "Group") {
            recommendations = [
              ...SHOW_DATABASE["💥 High-Intensity Action"],
              ...SHOW_DATABASE["🏆 Epic Competitive"]
            ];
            reasoning.push("Action genre with group viewing suggests exciting, shareable content");
          } else if (moodFactors.socialPreference === "Alone") {
            recommendations = [
              ...SHOW_DATABASE["🚀 Mind-Bending Sci-Fi"],
              ...SHOW_DATABASE["🎭 Complex Drama"]
            ];
            reasoning.push("Action genre for solo viewing suggests immersive, deep narratives");
          }
        } else if (moodFactors.genre === "Drama") {
          if (moodFactors.complexity === "High") {
            recommendations = [
              ...SHOW_DATABASE["🎭 Complex Drama"],
              ...SHOW_DATABASE["🚀 Mind-Bending Sci-Fi"]
            ];
            reasoning.push("Drama genre with high complexity preference suggests intellectual content");
          } else if (moodFactors.complexity === "Low") {
            recommendations = [
              ...SHOW_DATABASE["💘 Emotional Romance"],
              ...SHOW_DATABASE["😂 Light Comedy"]
            ];
            reasoning.push("Drama genre with low complexity suggests accessible, emotional shows");
          }
        }
      }
    }

    // Additional Contextual Filters
    if (moodFactors.depth === "Yes") {
      recommendations = recommendations.filter(show => 
        SHOW_DATABASE["🎭 Complex Drama"].includes(show) || 
        SHOW_DATABASE["🌍 Thought-Provoking Documentaries"].includes(show)
      );
      reasoning.push("Prioritized intellectually stimulating content");
    }

    if (moodFactors.music === "Yes") {
      recommendations = recommendations.filter(show => 
        SHOW_DATABASE["🎨 Innovative Animation"].includes(show)
      );
      reasoning.push("Highlighted shows with exceptional soundtracks");
    }

    // Fallback and Finalization
    if (recommendations.length === 0) {
      recommendations = allShows;
      reasoning.push("No specific matches found, providing diverse recommendations");
    }

    // Remove duplicates, randomize, and limit to 3 shows
    recommendations = [...new Set(recommendations)];
    recommendations = recommendations.sort(() => Math.random() - 0.5).slice(0, 3);

    return {
      shows: recommendations,
      reasoning: reasoning.join(". ") + "."
    };
  };

  // Updated forwardChain to display images
  const forwardChain = () => {
    const chainOrder = [
      { factor: 'stress', question: 'Are you feeling stressed? 🧠', options: ['Yes', 'No'] },
      { factor: 'mood', question: 'How would you describe your current mood?', options: ['Calm', 'Energetic', 'Neutral'] },
      { factor: 'energy', question: 'Are you feeling energetic today? ⚡', options: ['Yes', 'No'] },
      { factor: 'goal', question: 'Are you looking to relax or be entertained? 🎯', options: ['Relaxation', 'Entertainment'] },
      { factor: 'genre', question: 'Do you prefer Action or Drama? 🎭', options: ['Action', 'Drama'] },
      { factor: 'socialPreference', question: 'Are you watching alone or with others? 👥', options: ['Alone', 'Group'] },
      { factor: 'complexity', question: 'Do you prefer simple or complex storytelling? 🧩', options: ['Low', 'High'] },
      { factor: 'depth', question: 'Do you prefer deep, thought-provoking content? 🧐', options: ['Yes', 'No'] },
      { factor: 'music', question: 'Is good music/soundtrack important to you? 🎧', options: ['Yes', 'No'] }
    ];

    // Check if all factors have been answered
    const allFactorsAnswered = chainOrder.every(chain => moodFactors[chain.factor] !== null);

    // If all factors are answered, generate recommendations
    if (allFactorsAnswered) {
      const { shows, reasoning } = generateRecommendations();
      return (
        <div className={styles.recommendationContainer}>
          
          <div className={styles.recommendationsGrid}>
            {shows.map((show) => {
              const category = Object.keys(SHOW_DATABASE).find(key => 
                SHOW_DATABASE[key].some(s => s.name === show.name)
              );
              
              return (
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
              );
            })}
          </div>
          
          <div className={styles.reasoningBox}>
            <h3>How we chose these:</h3>
            <p>{reasoning}</p>
          </div>
          
          <button 
            className={styles.restartButton}
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

    // Find the first null factor
    const currentChain = chainOrder.find(chain => moodFactors[chain.factor] === null);

    return askQuestion(
      currentChain.factor, 
      currentChain.question, 
      currentChain.options
    );
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>🎬 Advanced Mood-Based Show Recommender</h1>
        <p>A comprehensive journey to find your perfect show</p>
      </header>
      
      <main>
        {forwardChain()}
      </main>
    </div>
  );
}