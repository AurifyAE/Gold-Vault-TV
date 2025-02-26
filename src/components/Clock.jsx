import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import USA from "../assets/flags/Us.png";
import UK from "../assets/flags/uk.png";
import MALAYSIA from "../assets/flags/Malaysia.png";
import INDIA from "../assets/flags/india.png";

const TimeDisplay = () => {
  const [times, setTimes] = useState({});

  const timeZones = {
    USA: { timeZone: "America/New_York", flag: USA },
    UK: { timeZone: "Europe/London", flag: UK },
    Malaysia: { timeZone: "Asia/Kuala_Lumpur", flag: MALAYSIA },
    India: { timeZone: "Asia/Kolkata", flag: INDIA },
  };

  // Function to format time in HH:MM AM/PM
  const formatTime = (timezone) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date());
  };

  useEffect(() => {
    const updateTime = () => {
      const updatedTimes = {};
      for (const [region, { timeZone }] of Object.entries(timeZones)) {
        updatedTimes[region] = formatTime(timeZone);
      }
      setTimes(updatedTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Box
      className="p-4"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0px",
        width: "100%",
      }}
    >
      {Object.entries(timeZones).map(([region, { flag }], index, arr) => (
        <React.Fragment key={region}>
          {/* Flag and Time */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "10px",
            }}
          >
            {/* Flag */}
            <img src={flag} alt={`${region} Flag`} className="w-16 h-10" />

            {/* Time */}
            <Typography
              variant="h6"
              sx={{
                color: "#E5D4A8",
                fontFamily: "Actay-Regular, sans-serif",
                fontSize: "1rem",
                marginTop: "5px",
                marginBottom: "0px"
              }}
            >
              {times[region] || "--:--"}
            </Typography>
          </Box>

          {/* Vertical Line Between Countries */}
          {index < arr.length - 1 && (
            <Box
              sx={{
                width: "6px",
                height: "3.8vw",
                backgroundColor: "#FFF",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TimeDisplay;
