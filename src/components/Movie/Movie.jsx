import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{
        padding: "10px",
      }}
    >
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box
          component={Link}
          sx={{
            alignItems: "center",
            fontWeight: "bolder",
            textDecoration: "none",

            [theme.breakpoints.up("xs")]: {
              display: "flex",
              flexDirection: "column",
            },
            "&:hover": {
              cursor: "pointer",
            },
          }}
          to={`/movie/${movie.id}`}
        >
          <img
            alt={movie.title}
            style={{
              borderRadius: "20px",
              height: "300px",
              marginBottom: "10px",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.filmurray.com/200/300"
            }
          />
          <Typography
            sx={{
              color: theme.palette.secondary[200],
              textOverflow: "ellipsis",
              width: "230px",
              overflow: "hidden",
              marginTop: "10px",
              marginBottom: 0,
              textAlign: "center",
            }}
            variant="h5"
          >
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${movie.vote_average} / 10`}
            color={theme.palette.secondary[100]}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Box>
      </Grow>
    </Grid>
  );
};

export default Movie;
