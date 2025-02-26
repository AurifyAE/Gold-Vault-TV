import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import gold from "../assets/gold.png";
import silver from "../assets/silver.png";
import goldLens from "../assets/goldLens.png";
import silverLens from "../assets/silverLens.png";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getBackgroundColor = (change) => {
    if (change === "up") {
      return "green"; // Green color for increase
    } else if (change === "down") {
      return "red"; // Red color for decrease
    }
    return ""; // White color for no change
  };

  const getColor = (change) => {
    if (change === "up") {
      return "white"; // Green color for increase
    } else if (change === "down") {
      return "white"; // Red color for decrease
    }
    return "white"; // Default color for no change
  };

  const getBorderColor = (change) => {
    if (change === "up") {
      return "3px solid green"; // Green color for increase
    } else if (change === "down") {
      return "3px solid red"; // Red color for decrease
    }
    return "3px solid #FFFFFF"; // Default color for no change
  };

  const renderSpotSection = (metal, data) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Change to column for separate heading and spot rate box
        alignItems: "center",
        gap: "1.5vw",
      }}
    >
      {/* Spot rate section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          padding: "1vw 0vw",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Box
          className="flex flex-row items-center justify-center p-5 pt-2 pb-2 relative"
          sx={{
            backgroundColor: metal === "gold" ? "#D6AF5B" : "#D1D1D1",
            width: "250px",
            position: "relative", // Enables absolute positioning for the image
          }}
        >
          {/* Top Corner Image */}
          <Box
            component="img"
            src={metal === "gold" ? gold : silver}
            alt="Corner Image"
            sx={{
              position: "absolute",
              top: "-30px", // Adjust to center the image on the corner
              left: metal === "gold" ? "-25px" : "auto",
              right: metal === "silver" ? "-35px" : "auto",
              width: "90px", 
              height: "90px",
            }}
          />

          {/* Opposite Side Image */}
          <Box
            component="img"
            src={metal === "gold" ? goldLens : silverLens} // Opposite image
            alt="Opposite Image"
            sx={{
              position: "absolute",
              top: "-45px", // Adjust to center at the bottom
              right: metal === "gold" ? "-45px" : "auto",
              left: metal === "silver" ? "-45px" : "auto",
              width: "90px",
              height: "90px",
            }}
          />

          {/* Metal Name */}
          <Typography
            sx={{
              color: "#000",
              fontSize: metal === "gold" ? "2.8vw" : "2.5vw",
              fontWeight: "600",
              fontFamily: "Anton-Regular, sans-serif",
            }}
          >
            {metal.toUpperCase()}
          </Typography>

          {/* OZ Text */}
          <Typography
            sx={{
              color: "#000",
              fontSize: "1.5vw",
              fontWeight: "600",
              fontFamily: "Anton-Regular, sans-serif",
              marginTop: "10px",
            }}
          >
            OZ
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "2.5vw",
              fontFamily: "Anton-Regular, sans-serif",
              margin: "0.5vw 0",
              color: getColor(data.bidChanged),
              backgroundColor: "trasnparent",
              border: getBorderColor(data.bidChanged),
              width: "12vw",
            }}
          >
            {data.bid}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: "7px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.3vw",
                color: "white",
                fontFamily: "Actay-Regular, sans-serif",
                marginLeft: "0.5vw",
              }}
            >
              LOW {data.low}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "2.5vw",
              fontFamily: "Anton-Regular, sans-serif",
              margin: "0.5vw 0",
              color: getColor(data.askChanged),
              backgroundColor: "trasnparent",
              border: getBorderColor(data.bidChanged),
              width: "12vw",
            }}
          >
            {data.ask}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              borderRadius: "7px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.3vw",
                color: "white",
                fontFamily: "Actay-Regular, sans-serif",
                marginLeft: "0.5vw",
              }}
            >
              HIGH {data.high}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      className="mx-auto rounded-lg text-center w-full"
      sx={{
        maxWidth: "100%",
        marginTop: "20px",
      }}
    >
      <Box
        className="flex flex-row items-center justify-between w-full pl-9 pr-9 p-1 mb-4"
        sx={{
          background:
            "linear-gradient(-90deg, #F0C367 0%, #BA7B31 50%, #F0C367 70%, #BB7D32 100%)",
        }}
      >
        {/* Label section */}
        <Typography
          sx={{
            fontSize: "1.5vw",
            color: "black",
            fontFamily: "ActayWide-Bold, sans-serif",
          }}
        >
          SPOT RATE
        </Typography>

        <Box className="flex flex-row items-center justify-center">
          <Typography
            sx={{
              fontSize: "1.5vw",
              fontFamily: "ActayWide-Bold, sans-serif",
              color: "black",
              marginLeft: "-200px",
            }}
          >
            BID
          </Typography>
          <Box
            className="flex justify-center items-center"
            sx={{
              position: "relative", // Allows absolute positioning for inner circle
              width: "28px", // Outer circle size
              height: "28px",
              borderRadius: "50%",
              border: "3px solid #008001", // Outer circle with border only
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            {/* Inner Filled Circle */}
            <Box
              sx={{
                width: "11px", // Inner circle size
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#008001", // Inner circle filled with black
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          </Box>
        </Box>

        <Box className="flex flex-row items-center justify-center">
          <Typography
            sx={{
              fontSize: "1.5vw",
              fontFamily: "ActayWide-Bold, sans-serif",
              color: "black",
              marginLeft: "-180px",
            }}
          >
            ASK
          </Typography>
          <Box
            className="flex justify-center items-center"
            sx={{
              position: "relative", // Allows absolute positioning for inner circle
              width: "28px", // Outer circle size
              height: "28px",
              borderRadius: "50%",
              border: "3px solid #D3222A", // Outer circle with border only
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            {/* Inner Filled Circle */}
            <Box
              sx={{
                width: "11px", // Inner circle size
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#D3222A", // Inner circle filled with black
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
        {renderSpotSection("gold", goldData)}
        {renderSpotSection("silver", silverData)}
      </Box>
    </Box>
  );
};

export default SpotRate;
