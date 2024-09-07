import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BannerCarousal from "../BannerCarousal/BannerCarousal";
import Header from "../Header/Header";
// import HomepageBannerCarousel from "../BannerCarousal/HomepageBannerCarousal";
import "./Home.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Categories from "../Category/Categories";
import Footer from "../Footer/Footer";
import { Box, CardContent, IconButton, Typography } from "@mui/material";
import { Card } from "react-bootstrap";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
const Home = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const pass = localStorage.getItem("pass");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!email && !pass) {
      navigate("/signin");
      return;
    }
  }, [email, navigate, pass]);

  if (!email & !pass) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -1200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 1200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Header />
      <BannerCarousal />
      <Box
        sx={{
          position: "relative",
          top: "-27rem",
        }}
      >
        <Categories />
        {/* <Categories />
        <Categories /> */}
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
