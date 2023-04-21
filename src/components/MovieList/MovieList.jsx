import React from "react";
import { Grid } from "@mui/material";
import { Movie } from "..";
import { useTheme } from "@mui/material/styles";

const MovieList = ({ movies, numberofMovieList, excludeFirst }) => {
  const theme = useTheme();
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
      }}
    >
      {movies.results.slice(startFrom, numberofMovieList).map((movie, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
