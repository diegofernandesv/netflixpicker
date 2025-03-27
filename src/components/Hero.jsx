"use client";
import React from "react";
import styles from "../InputDesign.module.css";
import ShowGallery from "./ShowGallery";

function Hero() {
  return (
    <section>
      <h2 className={styles.heroSubtitle}>Not Sure What to Watch?</h2>
      <h1 className={styles.heroTitle}>We've Got You.</h1>
      <ShowGallery />
    </section>
    
  );
}

export default Hero;
