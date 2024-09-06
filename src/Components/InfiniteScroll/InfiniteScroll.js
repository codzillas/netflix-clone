import React, { useState, useEffect, useRef } from "react";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);
  const totalBoxes = 16;

  const boxesPerPage = 4; // Number of visible boxes at a time

  useEffect(() => {
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
        left: (totalBoxes - boxesPerPage) * 100, // Adjust based on box width
        behavior: "smooth",
      });
      setScrollPosition(totalBoxes - boxesPerPage);
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
      left: direction === "right" ? boxesPerPage * 100 : -boxesPerPage * 100, // Adjust based on box width
      behavior: "smooth",
    });
  };

  return (
    <div className="infinite-scroll-container">
      <button className="scroll-btn" onClick={() => handleScroll("left")}>
        Left
      </button>
      <div className="scroll-box" ref={scrollRef}>
        {[...Array(totalBoxes)].map((_, index) => (
          <div className="box" key={index}>
            {index + 1}
          </div>
        ))}
      </div>
      <button className="scroll-btn" onClick={() => handleScroll("right")}>
        Right
      </button>
    </div>
  );
};

export default InfiniteScroll;
