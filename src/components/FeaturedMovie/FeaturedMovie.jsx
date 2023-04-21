import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const FeaturedMovie = ({ movie }) => {
  const theme = useTheme();
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          "&": {
            position: "relative",
          },
        }}
      >
        <CardMedia
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.575)",
            backgroundBlendMode: "darken",
          }}
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          title={movie.title}
        />
        <Box padding="20px">
          <CardContent
            sx={{
              color: "#fff",
              width: "40%",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              "&": {
                position: "relative",
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              color={theme.palette.grey[100]}
            >
              {movie.title}
            </Typography>
            <Typography variant="body2" color={theme.palette.grey[100]}>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
