import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
// import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import TimeDisplay from "../components/Clock";
import goldLogo from "../assets/goldLogo.png";
import MetalBarsCoins from "../components/MetalBarsCoins";
// import Carousel from "../components/Carousel"; 
// import TradingViewWidget from "../components/TradingViewWidget";
import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();

  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        // Handle Spot Rates
        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        // Handle Server URL
        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        // Handle News
        setNews(newsRes.data.news.news);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Allow TV screen view
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true); // Show the modal on 403 status
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  // Function to Fetch Market Data Using Socket
  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
              ...data,
              bidChanged:
                prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
                  ? data.bid > prevData[data.symbol].bid
                    ? "up"
                    : "down"
                  : null,
            },
          }));
        } else {
          console.warn("Received malformed market data:", data);
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      // Cleanup function to disconnect the socket
      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFormattedDateParts = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const day = date.toLocaleDateString("en-GB", { weekday: "long" });
    const dayOfMonth = date.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleDateString("en-GB", { month: "long" })
      .toUpperCase();
    const year = date.toLocaleDateString("en-GB", { year: "numeric" });

    return {
      day,
      date: dayOfMonth,
      month,
      year,
    };
  };

  const getFormattedTimeWithoutSeconds = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentDate = new Date();
  const { day, date, month, year } = getFormattedDateParts(currentDate);

  return (
    <Box sx={{ minHeight: "100vh", color: "white", padding: "20px" }}>
      {/* Grid */}
      <Grid
        container
        spacing={8}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Side: Date Time SpotRate */}
        <Grid item xs={12} md={8} sx={{width: "100%"}}>
          <Box className="flex flex-col items-center justify-between w-full">
            <Box className="flex flex-col items-center justify-between w-full">
              <img src={goldLogo} alt="" className="w-72 h-36 mt-5 mb-5" />
              <Box className="flex flex-row items-center justify-between mt-5 w-full">
                <Box className="flex flex-col items-center justify-between w-full">
                  <Box className="flex flex-row items-center justify-center w-full">
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "1.3vw",
                        fontFamily: "Actay-Regular, sans-serif",
                        color: "#E5D4A8",
                      }}
                    >
                      {getFormattedTimeWithoutSeconds(dateTime)} |
                    </Typography>
                    <Typography
                      className="text-white font-semibold text-xl"
                      sx={{
                        fontSize: "1.3vw",
                        fontFamily: "Actay-Regular, sans-serif",
                        color: "#E5D4A8",
                        marginLeft: "8px",
                      }}
                    >
                      {day.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box className="flex flex-row">
                    <Typography
                      className="text-white font-bold mx-2"
                      sx={{
                        fontSize: "1.5vw",
                        fontWeight: "600",
                        fontFamily: "Actay-Regular, sans-serif",
                        color: "#E5D4A8",
                      }}
                    >
                      {date}
                    </Typography>
                    <Typography
                      className="text-white font-bold mx-2"
                      sx={{
                        fontSize: "1.5vw",
                        fontWeight: "600",
                        marginLeft: "13px",
                        fontFamily: "Actay-Regular, sans-serif",
                        color: "#E5D4A8",
                        letterSpacing: "0.3rem",
                      }}
                    >
                      {month}
                    </Typography>
                    <Typography
                      className="text-white font-bold mx-2"
                      sx={{
                        fontSize: "1.5vw",
                        fontWeight: "600",
                        marginLeft: "13px",
                        fontFamily: "Actay-Regular, sans-serif",
                        color: "#E5D4A8",
                      }}
                    >
                      {year}
                    </Typography>
                  </Box>
                </Box>

                {/* World Clock */}
                <TimeDisplay />
              </Box>
            </Box>

            {/* SpotRate Component */}
            <SpotRate />
          </Box>
        </Grid>

        {/* Side: Right */}
        <Grid item xs={12} md={4}>
          {/* MetalBarsCoins */}
          <MetalBarsCoins/>

          {/* <Box className="flex flex-col justify-center items-center">
            <Typography sx={{ fontSize: "1.2vw", marginTop: "0px" }}>
              Powered by www.aurify.ae
            </Typography>
          </Box> */}
        </Grid>
      </Grid>

      {/* News Component */}
      {/* <NewsTicker newsItems={news} /> */}

      {/* Conditional rendering of the modal */}
      {showLimitModal && <LimitExceededModal />}
    </Box>
  );
}

export default TvScreen;
