// Import necessary modules and styles
import { useState } from 'react';
import styles from './backwardChaining.module.css';

// Define movie pairs for user selection
const MOVIE_PAIRS = [
  // Genre preference
  {
    pairId: 1,
    left: {
      title: "The Witcher",
      genre: "Action/Fantasy",
      moodTraits: ["adventurous", "intense"],
      image: "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg"
    },
    right: {
      title: "The Office",
      genre: "Comedy",
      moodTraits: ["lighthearted", "comfortable"],
      image: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg"
    }
  },
  // Tone preference
  {
    pairId: 2,
    left: {
      title: "Stranger Things",
      genre: "Sci-Fi/Horror",
      moodTraits: ["nostalgic", "tense"],
      image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"
    },
    right: {
      title: "Friends",
      genre: "Sitcom",
      moodTraits: ["comfortable", "social"],
      image: "https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg"
    }
  },
  // Intensity preference
  {
    pairId: 3,
    left: {
      title: "Breaking Bad",
      genre: "Drama",
      moodTraits: ["intense", "focused"],
      image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
    },
    right: {
      title: "Parks and Recreation",
      genre: "Comedy",
      moodTraits: ["optimistic", "playful"],
      image: "https://image.tmdb.org/t/p/w500/dFs6yHxheEGoZSoZ1SwjKxhK0JQ.jpg"
    }
  },
  // Intellectual vs Fun
  {
    pairId: 4,
    left: {
      title: "Our Planet",
      genre: "Documentary",
      moodTraits: ["thoughtful", "curious"],
      image: "https://image.tmdb.org/t/p/w500/2YTxHJ4hApgXQqHOnSyVG1QHJE1.jpg"
    },
    right: {
      title: "Brooklyn Nine-Nine",
      genre: "Comedy",
      moodTraits: ["playful", "social"],
      image: "https://image.tmdb.org/t/p/w500/hgRMSOt7a1b8qyQR68vUixJPang.jpg"
    }
  },
  // Classic vs Contemporary
  {
    pairId: 5,
    left: {
      title: "The Godfather",
      genre: "Classic Drama",
      moodTraits: ["serious", "reflective"],
      image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
    },
    right: {
      title: "The Queen's Gambit",
      genre: "Modern Drama",
      moodTraits: ["focused", "competitive"],
      image: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg"
    }
  },
  // Fantasy vs Reality
  {
    pairId: 6,
    left: {
      title: "Game of Thrones",
      genre: "Fantasy",
      moodTraits: ["escapist", "epic"],
      image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
    },
    right: {
      title: "The Crown",
      genre: "Historical Drama",
      moodTraits: ["reflective", "elegant"],
      image: "https://image.tmdb.org/t/p/w500/jJbEpW4R0WqF6boQ3EgWKAe3Xth.jpg"
    }
  },
  // Dark vs Light
  {
    pairId: 7,
    left: {
      title: "Black Mirror",
      genre: "Dystopian",
      moodTraits: ["thought-provoking", "dark"],
      image: "https://image.tmdb.org/t/p/w500/7PRddOlg1ENWmCpr9hw3QKXh0x8.jpg"
    },
    right: {
      title: "Ted Lasso",
      genre: "Feel-good Comedy",
      moodTraits: ["optimistic", "uplifting"],
      image: "https://image.tmdb.org/t/p/w500/y7ujJV5aDviQuuYhWqDWnE9h8Xy.jpg"
    }
  },
  // Romantic vs Action
  {
    pairId: 8,
    left: {
      title: "Bridgerton",
      genre: "Romantic Drama",
      moodTraits: ["romantic", "passionate"],
      image: "https://image.tmdb.org/t/p/w500/k8uUqNo9dblm8P8ZPynqZxUKw5B.jpg"
    },
    right: {
      title: "John Wick",
      genre: "Action",
      moodTraits: ["adrenaline", "intense"],
      image: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg"
    }
  }
];

// Define final moods with descriptions, emojis, colors, and recommendations
const FINAL_MOODS = {
  adventurous: {
    description: "You're feeling adventurous and ready for excitement!",
    emoji: "🏔️",
    color: "#ff9a3c",
    recommendations: ["The Witcher", "Indiana Jones", "Jurassic Park", "Jumanji"]
  },
  intense: {
    description: "You're in an intense, focused mood for gripping stories.",
    emoji: "🔥",
    color: "#ff3c3c",
    recommendations: ["Breaking Bad", "The Dark Knight", "Inception", "Prison Break"]
  },
  lighthearted: {
    description: "You want something lighthearted and fun!",
    emoji: "😄",
    color: "#f6f930",
    recommendations: ["The Office", "Superbad", "Legally Blonde", "Schitt's Creek"]
  },
  comfortable: {
    description: "You're seeking comfort and familiarity.",
    emoji: "🛋️",
    color: "#a1dd70",
    recommendations: ["Friends", "How I Met Your Mother", "The Big Bang Theory", "New Girl"]
  },
  nostalgic: {
    description: "You're feeling nostalgic for the past.",
    emoji: "🕰️",
    color: "#c68aff",
    recommendations: ["Stranger Things", "Stand By Me", "Back to the Future", "The Wonder Years"]
  },
  thoughtful: {
    description: "You're in a reflective, thoughtful mood.",
    emoji: "🤔",
    color: "#3ca3ff",
    recommendations: ["Our Planet", "The Social Dilemma", "Cosmos", "The Mind Explained"]
  },
  playful: {
    description: "You're feeling playful and silly!",
    emoji: "🎭",
    color: "#ff6bdf",
    recommendations: ["Brooklyn Nine-Nine", "The Lego Movie", "Deadpool", "The Mask"]
  },
  social: {
    description: "You're in a social, outgoing mood.",
    emoji: "👥",
    color: "#3cffb9",
    recommendations: ["Friends", "The Hangover", "Pitch Perfect", "Crazy Rich Asians"]
  },
  romantic: {
    description: "You're in a romantic, passionate mood.",
    emoji: "💖",
    color: "#ff6b8b",
    recommendations: ["Bridgerton", "Pride and Prejudice", "The Notebook", "La La Land"]
  },
  dark: {
    description: "You're in a mood for dark, thought-provoking content.",
    emoji: "🌑",
    color: "#6b3cff",
    recommendations: ["Black Mirror", "True Detective", "Dexter", "American Psycho"]
  },
  epic: {
    description: "You're craving something grand and epic!",
    emoji: "⚔️",
    color: "#ffcc3c",
    recommendations: ["Game of Thrones", "Lord of the Rings", "Gladiator", "Braveheart"]
  }
};

// Main component for the Movie Mood Analyzer
export default function MovieMoodAnalyzer() {
  // State variables to manage the current question, selected traits, and analysis results
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedMoodTraits, setSelectedMoodTraits] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [finalMood, setFinalMood] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Handle user selection of a movie and update state accordingly
  const handleMovieSelection = (moodTraits) => {
    setIsSelecting(true);
    setTimeout(() => {
      const newTraits = [...selectedMoodTraits, ...moodTraits];
      setSelectedMoodTraits(newTraits);

      // Move to the next question or complete the analysis
      if (currentPairIndex < MOVIE_PAIRS.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
      } else {
        determineFinalMood(newTraits);
        setAnalysisComplete(true);
      }
      setIsSelecting(false);
    }, 300);
  };

  // Determine the final mood based on selected traits
  const determineFinalMood = (traits) => {
    const traitCounts = traits.reduce((acc, trait) => {
      acc[trait] = (acc[trait] || 0) + 1;
      return acc;
    }, {});

    // Get top 2 traits and check for combined mood
    const sortedTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const combinedMood = sortedTraits.join('-');
    if (FINAL_MOODS[combinedMood]) {
      setFinalMood(FINAL_MOODS[combinedMood]);
    } else {
      // Fall back to the most common trait
      setFinalMood(FINAL_MOODS[sortedTraits[0]]);
    }
  };

  // Reset the analysis to start over
  const resetAnalysis = () => {
    setCurrentPairIndex(0);
    setSelectedMoodTraits([]);
    setAnalysisComplete(false);
    setFinalMood(null);
  };

  // Render the results if the analysis is complete
  if (analysisComplete && finalMood) {
    return (
      <div className={styles.resultsContainer} style={{ backgroundColor: finalMood.color }}>
        <div className={styles.resultContent}>
          <h2 className={styles.resultTitle}>Your Movie Mood</h2>
          <div className={styles.moodResult}>
            <span className={styles.moodEmoji}>{finalMood.emoji}</span>
            <p className={styles.moodDescription}>{finalMood.description}</p>
          </div>
          
          <div className={styles.recommendations}>
            <h3>We Recommend:</h3>
            <ul>
              {finalMood.recommendations.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          </div>
          
          <button 
            className={styles.restartButton}
            onClick={resetAnalysis}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Render the current movie pair for selection
  const currentPair = MOVIE_PAIRS[currentPairIndex];

  return (
    <div className={`${styles.container} ${isSelecting ? styles.fadeOut : ''}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Movie Mood Analyzer</h1>
        <p className={styles.subtitle}>Discover your current mood through your movie preferences</p>
      </header>
      
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeader}>
          <h2 className={styles.selectionTitle}>Which do you like more?</h2>
          <p className={styles.progress}>Question {currentPairIndex + 1} of {MOVIE_PAIRS.length}</p>
        </div>
        
        <div className={styles.moviePair}>
          <div 
            className={styles.movieOption}
            onClick={() => !isSelecting && handleMovieSelection(currentPair.left.moodTraits)}
          >
            <div className={styles.movieImage}>
              <img src={currentPair.left.image} alt={currentPair.left.title} />
            </div>
            <div className={styles.movieInfo}>
              <h3>{currentPair.left.title}</h3>
              <p>{currentPair.left.genre}</p>
            </div>
          </div>
          
          <div className={styles.orDivider}>or</div>
          
          <div 
            className={styles.movieOption}
            onClick={() => !isSelecting && handleMovieSelection(currentPair.right.moodTraits)}
          >
            <div className={styles.movieImage}>
              <img src={currentPair.right.image} alt={currentPair.right.title} />
            </div>
            <div className={styles.movieInfo}>
              <h3>{currentPair.right.title}</h3>
              <p>{currentPair.right.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}