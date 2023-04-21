import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Movie } from "..";

const RatedCards = ({ title, data }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        color={theme.palette.secondary[100]}
      >
        {" "}
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {data &&
          data.results.map((movie, i) => (
            <Movie key={movie.id} movie={movie} i={i} />
          ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
