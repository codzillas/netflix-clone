import Carousel from "react-bootstrap/Carousel";
import "./BannerCarousal.css";

function BannerCarousal() {
  return (
    <Carousel
      style={{
        backgroundColor: "black",
        // position: "absolute",
        // top: "0",
        position: "relative",
        top: "-4rem",
      }}
    >
      <Carousel.Item>
        {/* <img src="/1.jpg" style={{ width: "100%", height: "100%" }} /> */}
        <video
          style={{ width: "100%", height: "100%" }}
          muted
          // controls
          autoPlay
          loop
          preload="auto"
        >
          <source src="1.mp4" type="video/mp4" />
        </video>
        <Carousel.Caption className="CarousalCaption">
          <div className="CaptionHeading">Second slide label</div>
          <div className="CaptionDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <video
          style={{ width: "100%", height: "100%" }}
          // controls
          autoPlay
          muted
          loop
          preload="auto"
        >
          <source src="2.mp4" type="video/mp4" />
        </video>
        <Carousel.Caption className="CarousalCaption">
          <div className="CarousalCaptionWrapper">
            <div className="CaptionHeading">Second slide label</div>
            <div className="CaptionDescription">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerCarousal;
