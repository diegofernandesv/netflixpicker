"use client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./InputDesign.module.css";
import "./index.css"; // Import the missing CSS file
import Header from "./components/Header";
import Hero from "./components/Hero";
import ForwardChaining from "./views/ForwardChaining"; // Corrected path
import BackwardChaining from "./views/BackwardChaining"; // Corrected path

function InputDesign() {
  return (
    <Router>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div id="root">
        <main className={styles.mainContainer}>
          <Header />
          <div className={styles.contentWrapper}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/mood" element={<ForwardChaining />} />
              <Route path="/genre" element={<BackwardChaining />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default InputDesign;
