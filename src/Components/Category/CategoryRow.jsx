import { Box, CardContent, IconButton, Typography } from "@mui/material";
import MovieCard from "../Card/Card";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const arrowStyle = {
  position: "absolute",
  color: "white",
  background: "hsla(0, 0%, 8%, .5)",
  borderRadius: 0,
  height: "5.3%",
};
function CategoryRow({ moviesPosters, title }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);
  const totalBoxes = 16;

  const boxesPerPage = 4; // Number of visible boxes at a time

  useEffect(() => {
    if (scrollRef) {
      if (scrollPosition >= totalBoxes) {
        // Reset scroll to the start
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrollPosition(0);
      } else if (scrollPosition < 0) {
        // Scroll to the last set of boxes
        scrollRef.current.scrollTo({
          left: (totalBoxes - boxesPerPage) * 368, // Adjust based on box width
          behavior: "smooth",
        });
        setScrollPosition(totalBoxes - boxesPerPage);
      }
    }
  }, [scrollPosition]);

  const handleScroll = (direction) => {
    if (direction === "right") {
      setScrollPosition((prev) => prev + boxesPerPage);
    } else if (direction === "left") {
      setScrollPosition((prev) => prev - boxesPerPage);
    }

    // Scroll by one page (4 boxes)
    scrollRef.current.scrollBy({
      left: direction === "right" ? boxesPerPage * 368 : -boxesPerPage * 368, // Adjust based on box width
      behavior: "smooth",
    });
  };

  return (
    <Box>
      <Typography className="next-watch" variant="h2">
        {title}
      </Typography>

      <Box
        sx={{
          alignItems: "center",
          display: "-webkit-box",
          overflowX: "hidden",
        }}
        onMouseEnter={() => {
          console.log("hello");
          setShowArrows(true);
        }}
        onMouseLeave={() => setShowArrows(false)}
        ref={scrollRef}
      >
        <IconButton
          onClick={() => {
            handleScroll("left");
          }}
          sx={{
            display: showArrows ? "block" : "none",
            left: 0,
            ...arrowStyle,
          }}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        {moviesPosters.map((src) => {
          return <MovieCard src={src} />;
        })}
        <IconButton
          onClick={() => {
            handleScroll("right");
          }}
          sx={{
            right: 0,
            display: showArrows ? "block" : "none",
            ...arrowStyle,
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CategoryRow;
