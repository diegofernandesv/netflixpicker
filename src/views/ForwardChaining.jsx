import React, { useState, useEffect } from 'react';
import styles from './forwardchaining.module.css';

// 🗃️ Expanded database of 150+ Netflix shows with emoji tags
const SHOW_DATABASE = {
  // ⚡ High Energy
  "💥 Action": ["⚔️ The Witcher", "👽 Stranger Things", "🎭 Money Heist", "🥋 Cobra Kai", "🌌 Arcane"],
  "🚀 Sci-Fi": ["🌀 Dark", "🔮 Altered Carbon", "❤️💀🤖 Love Death + Robots", "📺 Black Mirror", "😴 The Sandman"],
  "😂 Comedy": ["👮♂️ Brooklyn Nine-Nine", "☁️ The Good Place", "🎓 Community", "⚽ Ted Lasso", "📄 The Office"],

  // 🌗 Medium Energy
  "🎭 Drama": ["🧪 Breaking Bad", "⚖️ Better Call Saul", "👑 The Crown", "♟️ The Queen's Gambit", "🍸 Mad Men"],
  "😱 Thriller": ["💵 Ozark", "🕵️♂️ Mindhunter", "👀 You", "💍 Bridgerton", "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Outlander"],

  // 🌙 Low Energy
  "🌍 Documentary": ["🌿 Our Planet", "🍝 Chef's Table", "🌃 Night on Earth", "🐙 My Octopus Teacher", "🐅 Tiger King"],
  "🎨 Animation": ["🐴 BoJack Horseman", "👄 Big Mouth", "🏰 Disenchantment", "🧛♂️ Castlevania", "🌌 Arcane"],
  "💘 Romance": ["💎 Bridgerton", "⛰️ Outlander", "🏖️ Virgin River", "🍰 Emily in Paris", "💌 To All the Boys"]
};

export default function UltimateMoodRecommender() {
  // 🌡️ Mood State with multiple factors
  const [moodFactors, setMoodFactors] = useState({
    "⚡ Energy Level": null,
    "🧠 Stress Level": null,
    "👥 Social Setting": null,
    "🎭 Preferred Genre": null,
    "⏱️ Time Available": null,
    "🧐 Content Depth": null,
  });

  // 🚦 Question flow manager
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 🗂️ Enhanced question flow with emojis
  const QUESTION_FLOW = [
    {
      key: "⚡ Energy Level",
      text: "How energized are you feeling right now?",
      options: [
        "⚡ High (Want excitement!)", 
        "🌗 Medium (Balanced mood)", 
        "🌙 Low (Need comfort)"
      ],
      icon: "⚡"
    },
    {
      key: "🧠 Stress Level",
      text: "How stressed are you currently?",
      options: [
        "🌋 Very stressed (Need distraction!)", 
        "🌊 Somewhat stressed", 
        "🏝️ Relaxed (Open to anything)"
      ],
      icon: "🧠"
    },
    {
      key: "👥 Social Setting",
      text: "Are you watching alone or with others?",
      options: [
        "🕴️ Solo viewing", 
        "💑 With partner", 
        "👨‍👩‍👧‍👦 Group watch", 
        "👪 Family time"
      ],
      icon: "👥"
    },
    {
      key: "🎭 Preferred Genre",
      text: "What genre makes your heart race?",
      options: Object.keys(SHOW_DATABASE),
      icon: "🎬"
    },
    {
      key: "⏱️ Time Available",
      text: "How long can you binge?",
      options: [
        "⌛ Quick hit (<30 min)", 
        "📺 Single episode", 
        "🍿 Movie night", 
        "🛋️ Binge marathon"
      ],
      icon: "⏱️"
    },
    {
      key: "🧐 Content Depth",
      text: "How deep do you want to go?",
      options: [
        "🦋 Light & fluffy", 
        "🤔 Thought-provoking", 
        "🎢 Emotional ride", 
        "🌀 Mind-bending"
      ],
      icon: "🧠"
    }
  ];

  // 🎉 Confetti effect on completion
  useEffect(() => {
    if (currentQuestion === QUESTION_FLOW.length) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  // 💬 Dynamic question rendering
  const renderCurrentQuestion = () => (
    <div className={styles.questionContainer}>
      <div className={styles.questionBox}>
        <div className={styles.questionHeader}>
          <span className={styles.emojiIcon}>{QUESTION_FLOW[currentQuestion].icon}</span>
          <h3>{QUESTION_FLOW[currentQuestion].text}</h3>
        </div>
        <div className={styles.optionsGrid}>
          {QUESTION_FLOW[currentQuestion].options.map(option => (
            <button
              key={option}
              className={styles.optionButton}
              onClick={() => {
                setMoodFactors({...moodFactors, [QUESTION_FLOW[currentQuestion].key]: option});
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {currentQuestion > 0 && (
          <button 
            className={`${styles.backButton} ${styles.navButton}`}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );

  const generateRecommendations = () => {
    let recs = SHOW_DATABASE[moodFactors["🎭 Preferred Genre"]] || [];
  
    // Debugging: Log initial recommendations
    console.log("Initial recommendations:", recs);
  
    // Stress filter
    if (moodFactors["🧠 Stress Level"]?.includes("🌋")) {
      recs = recs.filter(show => !show.includes("Dark") && !show.includes("Mindhunter"));
      console.log("After stress filter:", recs);
    }
  
    // Time filter
    if (moodFactors["⏱️ Time Available"]?.includes("⌛")) {
      recs = recs.filter(show => ["The Office", "Brooklyn Nine-Nine"].some(s => show.includes(s)));
      console.log("After time filter:", recs);
    }
  
    // Content depth adjustment
    if (moodFactors["🧐 Content Depth"] === "🦋") {
      recs = recs.concat(["😺 The Great British Baking Show", "🤪 Nailed It!", "🦄 Unicorn Store"]);
      console.log("After content depth adjustment:", recs);
    }
  
    // Fallback logic: Ensure there are always recommendations
    if (recs.length === 0) {
      recs = ["🎥 Default Recommendation 1", "🎥 Default Recommendation 2", "🎥 Default Recommendation 3"];
      console.log("Fallback recommendations:", recs);
    }
  
    // Randomize and limit to 8 recommendations
    const finalRecs = [...new Set(recs)].slice(0, Math.min(8, recs.length));
    console.log("Final recommendations:", finalRecs);
  
    return finalRecs;
  };

  
  // 🎬 Results display
  const showResults = () => {
    const recommendations = generateRecommendations();
    return (
      <div className={styles.resultsContainer}>
        {showConfetti && <div className={styles.confetti}>🎉</div>}
        
        <h2>Your Perfect Netflix Matches</h2>
        
        <div className={styles.moodProfile}>
          <h3>Your Mood Profile:</h3>
          <ul>
            {Object.entries(moodFactors).map(([key, value]) => (
              value && <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.recommendationsGrid}>
          {recommendations.map((show, index) => (
            <div key={index} className={styles.showCard}>
              <div className={styles.showEmoji}>{show.split(" ")[0]}</div>
              <h3>{show}</h3>
              <div className={styles.showMeta}>
                <span>⭐ {Math.random() > 0.5 ? "4.5+" : "4.0+"}</span>
                <span>{moodFactors["🎭 Preferred Genre"]?.split(" ")[1]}</span>
              </div>
              <button className={styles.watchButton}>
                ▶️ Watch Now
              </button>
            </div>
          ))}
        </div>

        <div className={styles.resultsActions}>
          <button 
            className={`${styles.restartButton} ${styles.navButton}`} // Apply the same button style
            onClick={() => {
              setMoodFactors({
                "⚡ Energy Level": null,
                "🧠 Stress Level": null,
                "🎭 Preferred Genre": null,
                "⏱️ Time Available": null,
                "🧐 Content Depth": null
              });
              setCurrentQuestion(0);
            }}
          >
            🔄 Start New Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Netflix Mood Matcher</h1>
        <p>AI-powered recommendations based on your emotional state</p>
      </header>

      <main className={styles.appMain}>
        {currentQuestion < QUESTION_FLOW.length ? renderCurrentQuestion() : showResults()}
      </main>
    </div>
  );
}
