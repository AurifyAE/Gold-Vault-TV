import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

// Import Images
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";
import image8 from "../assets/images/image8.png";

// Image Pairs with Details
const imagePairs = [
  {
    front: image1,
    back: image2,
    title: "Gold Bars - 1 Ounce",
    metal: "Gold",
    types: "Minted Bar",
    weight: "1 Ounce",
  },
  {
    front: image3,
    back: image4,
    title: "Silver Bars - 1 Ounce",
    metal: "Silver",
    types: "Minted Bar",
    weight: "1 Ounce",
  },
  {
    front: image5,
    back: image6,
    title: "Gold Coins - 24k - 1 Ounce",
    metal: "Gold",
    types: "Gold Coin",
    weight: "2.5G, 5G, 10G, 20G, 1 Ounce",
  },
  {
    front: image7,
    back: image8,
    title: "Silver Coins - 1 Ounce",
    metal: "Silver",
    types: "Silver Coin",
    weight: "5G, 10G, 20G, 1 Ounce, 50G, 100G",
  },
];

const MetalBarsCoins = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  // Auto-Flip between front and back every 3 seconds
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setShowFront((prev) => !prev);
    }, 3000);

    return () => clearInterval(flipInterval);
  }, []);

  // Auto-Switch to the Next Pair every 6 seconds
  useEffect(() => {
    const pairInterval = setInterval(() => {
      setCurrentPairIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
      setShowFront(true); // Always show front when switching pairs
    }, 6000);

    return () => clearInterval(pairInterval);
  }, []);

  const currentPair = imagePairs[currentPairIndex];

  return (
    <Box className="flex flex-col items-center justify-center mt-16">
      {/* Heading */}
      <Box textAlign="center">
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5vw",
            color: "#E5D4A8",
            fontFamily: "Actay-Regular, sans-serif",
            letterSpacing: "0.25rem",
          }}
        >
          INVESTMENT
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5vw",
            color: "#E5D4A8",
            fontFamily: "Actay-Regular, sans-serif",
            letterSpacing: "0.1rem",
          }}
        >
          BARS & COINS
        </Typography>
      </Box>

      {/* Flip Card Container */}
      <Box
        sx={{
          width: "350px",
          height: "450px",
          perspective: "1000px",
          padding: "2vw 0vw"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: showFront ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* Front Side */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={currentPair.front}
              alt="Front View"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* Back Side */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={currentPair.back}
              alt="Back View"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Image Pair Details */}
      <Typography
        variant="h6"
        sx={{
          marginTop: "10px",
          fontWeight: "bold",
          color: "#fff",
          textTransform: "uppercase",
          fontFamily: "Anton-Regular, sans-serif",
          fontSize: "1.5vw"
        }}
      >
        {currentPair.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#FFF",
          textAlign: "center",
          marginTop: "1.9rem",
          textTransform: "uppercase",
          marginBottom: "0.2rem",
          fontFamily: "Anton-Regular, sans-serif",
          fontSize: "1.2vw"
        }}
      >
        Specifications
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#FFF",
          textAlign: "center",
          width: "80%",
          textTransform: "uppercase",
          fontFamily: "Anton-Regular, sans-serif",
          fontSize: "1.2vw"
        }}
      >
        Metal : {currentPair.metal}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#FFF",
          textAlign: "center",
          width: "80%",
          textTransform: "uppercase",
          fontFamily: "Anton-Regular, sans-serif",
          fontSize: "1.2vw"
        }}
      >
        Types : {currentPair.types}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#FFF",
          textAlign: "center",
          width: "80%",
          textTransform: "uppercase",
          fontFamily: "Anton-Regular, sans-serif",
          fontSize: "1.2vw"
        }}
      >
        Weight : {currentPair.weight}
      </Typography>
    </Box>
  );
};

export default MetalBarsCoins;
