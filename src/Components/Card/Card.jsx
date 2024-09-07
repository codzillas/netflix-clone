import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomizedDialogs from "../Dialog/Dialog";
import "./Card.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { Box } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const iconStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "50%",
  // width: "3vw",
  // height: "3vh",
};

const hoverCardStyle = {
  transform: "scale(1.5, 1)",
  display: "block",
  position: "absolute",
  top: 0,
  left: 0,
};
export default function MovieCard({ src }) {
  const [open, setOpen] = React.useState(false);
  const [onCardHover, setOnCardHover] = React.useState(false);
  const genres = ["Dark", "Drama", "Sc-fi", "Comedy"];
  const isCardHoverStyle = onCardHover ? { ...hoverCardStyle } : {};
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          // height: "12rem",
          width: "16.66%",
          border: 0,
          borderRadius: 0,
          cursor: "pointer",
          display: onCardHover ? "none" : "block",
        }}
      >
        <CardContent
          className="card-content"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img
            src={src}
            style={{ width: "100%", height: "100%" }}
            alt="img"
            onMouseEnter={() => {
              setTimeout(() => {
                setOnCardHover(true);
              }, 500);
            }}
          />
        </CardContent>
        {open && <CustomizedDialogs open={open} setOpen={setOpen} />}
      </Card>
      <Card
        variant="outlined"
        sx={{
          // height: "12rem",
          width: "23%",
          border: 0,
          borderRadius: 0,
          cursor: "pointer",
          display: onCardHover ? "block" : "none",
          // ...isCardHoverStyle,
        }}
      >
        <CardContent
          className="card-content"
          onClick={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOnCardHover(false);
          }}
        >
          <video
            style={{ width: "100%", height: "100%" }}
            muted
            // controls
            autoPlay
            loop
            preload="auto"
          >
            <source src="2.mp4" type="video/mp4" />
          </video>
          {/* <img src={src} style={{ width: "100%", height: "100%" }} alt="img" /> */}
          <Box sx={{ backgroundColor: "black", height: "100%", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "11vw",
                }}
              >
                <PlayArrowIcon sx={iconStyle} />
                <AddCircleIcon sx={iconStyle} />
                <ThumbUpOutlinedIcon sx={iconStyle} />
              </Box>
              <ArrowDropDownCircleOutlinedIcon sx={iconStyle} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Typography
                variant="span"
                sx={{
                  color: "white",
                  fontSize: "1.2vw",
                  border: "1px solid",
                  padding: "4px",
                }}
              >
                U/A 16+
              </Typography>
              <Typography
                variant="span"
                sx={{ color: "white", fontSize: "1.2vw" }}
              >
                Limited Series
              </Typography>
              <Typography
                variant="span"
                sx={{ color: "white", fontSize: "1.2vw" }}
              >
                HD
              </Typography>
            </Box>
            <Box sx={{ py: 1, display: "flex", flexWrap: "wrap" }}>
              {genres.map((genre, index) => (
                <Typography
                  variant="span"
                  sx={{
                    color: "white",
                    margin: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    width: "6vw",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  {genre}
                </Typography>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
