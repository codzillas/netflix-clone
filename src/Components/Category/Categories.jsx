import { Box } from "@mui/material";
import CategoryRow from "./CategoryRow";
import {
  MOVIES_POSTER1,
  MOVIES_POSTER2,
  MOVIES_POSTER3,
  MOVIES_POSTER4,
  MOVIES_POSTER5,
} from "../../shared/constants";

function Categories() {
  return (
    <Box>
      <CategoryRow title={"Your Next Watch"} moviesPosters={MOVIES_POSTER1} />
      {/* <CategoryRow title={"New on Netflix"} moviesPosters={MOVIES_POSTER2} />
      <CategoryRow title={"Sci-Fi & Fantasy"} moviesPosters={MOVIES_POSTER3} />
      <CategoryRow
        title={"Award Winning US Dramas"}
        moviesPosters={MOVIES_POSTER4}
      />
      <CategoryRow title={"Only on Netflix"} moviesPosters={MOVIES_POSTER5} /> */}
    </Box>
  );
}

export default Categories;
