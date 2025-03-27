"use client";
import React from "react";
import styles from "../InputDesign.module.css";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";

function ShowGallery() {
  // Array of show images to display in the gallery
  const showImages = [
    {
      id: 1,
      url: image1,
      alt: "Show poster 1",
    },
    {
      id: 2,
      url: image2,
      alt: "Show poster 2",
    },
    {
      id: 3,
      url: image3,
      alt: "Show poster 3",
    },
    {
      id: 4,
      url: image4,
      alt: "Show poster 4",
    },
    {
      id: 5,
      url: image5,
      alt: "Show poster 5",
    },
  ];

  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        {showImages.concat(showImages).map((show, index) => (
          <div key={index} className={styles.slide}>
            <img src={show.url} alt={show.alt} className={styles.showImage} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowGallery;
