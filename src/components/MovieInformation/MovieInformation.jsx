/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Box,
  CircularProgress,
  useTheme,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import genreIcon from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MovieList } from "..";
import { userSelector } from "../../features/auth";

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: recommendations, isFetching: isRecommendationFetching } =
    useGetRecommendationsQuery({ movie_id: id, list: "/recommendations" });
  const dispatch = useDispatch();
  const [isMovieFavorited, setisMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setisMovieWatchlisted] = useState(false);

  useEffect(() => {
    if (favoriteMovies && data) {
      setisMovieFavorited(
        !!favoriteMovies.results.find((movie) => movie.id === data.id)
      );
    }
  }, [favoriteMovies, data]);
  useEffect(() => {
    if (watchlistMovies && data) {
      setisMovieWatchlisted(
        !!watchlistMovies.results.find((movie) => movie.id === data.id)
      );
    }
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setisMovieFavorited((prev) => !prev);
  };
  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setisMovieWatchlisted((prev) => !prev);
  };

  const [open, setOpen] = useState(false);
  if (isFetching && !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {" "}
        <CircularProgress
          size="8rem"
          sx={{
            color: theme.palette.secondary[100],
          }}
        />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {" "}
        <Typography variant="h4" color="error">
          Something went wrong. Please try again later.
          <Link to="/">Go back to home page</Link>
        </Typography>
      </Box>
    );
  }
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        margin: "10px 0 !important",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          flexWrap: "wrap",
        },
      }}
    >
      <Grid item sm={12} lg={4}>
        <Box
          component="img"
          sx={{
            borderRadius: "20px",
            boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
            width: "80%",
            [theme.breakpoints.down("md")]: {
              width: "50%",
              margin: "0 auto",
              display: "flex",
              marginBottom: "30px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "100%",
              margin: "0 auto",
              height: "350px",
              marginBottom: "30px",
            },
          }}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{
            color: theme.palette.secondary[300],
          }}
        >
          {data.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            color: theme.palette.secondary[100],
          }}
        >
          {data.tagline}
        </Typography>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px 0 !important",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              flexWrap: "wrap",
            },
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Rating
              name="read-only"
              value={data.vote_average / 2}
              readOnly
              precision={0.5}
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{
                marginLeft: "10px",
                color: theme.palette.secondary[100],
              }}
            >
              {data.vote_average} /10
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            color={theme.palette.secondary[100]}
          >
            {data.runtime} min | Language: {data.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: "10px 0 !important",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {data.genres.map((genre, i) => (
            <Box
              component={Link}
              key={i}
              to="/"
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                [theme.breakpoints.down("sm")]: {
                  padding: "0.5rem 1rem",
                },
              }}
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <img
                src={genreIcon[genre.name.toLowerCase()]}
                alt="logo"
                style={{
                  filter: theme.palette.type === "dark" && "invert(1)",
                  marginRight: "10px",
                }}
                height={30}
              />{" "}
              <Typography
                variant="subtitle1"
                color={theme.palette.secondary[100]}
              >
                {genre.name}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "10px" }}
          color={theme.palette.secondary[200]}
        >
          Overview
        </Typography>
        <Typography
          style={{ marginBottom: "2rem" }}
          color={theme.palette.secondary[100]}
        >
          {data.overview}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          color={theme.palette.secondary[100]}
        >
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data.credits &&
            data.credits.cast.slice(0, 6).map(
              (character, i) =>
                character.profile_path && (
                  <Grid
                    key={i}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                      alt={character.name}
                      style={{
                        width: "100%",
                        maxWidth: "7em",
                        height: "8em",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      align="center"
                      color={theme.palette.secondary[100]}
                    >
                      {character.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      color={theme.palette.secondary[100]}
                    >
                      {character.character}
                    </Typography>
                  </Grid>
                )
            )}
        </Grid>
        <Grid item container spacing={2} style={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
              }}
            >
              <ButtonGroup variant="outlined" size="small">
                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  href={data.homepage}
                  endIcon={<Language />}
                  style={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  href={`https://www.imdb.com/title/${data.imdb_id}`}
                  endIcon={<MovieIcon />}
                  style={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                  style={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
              }}
            >
              <ButtonGroup variant="outlined" size="small">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                  style={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                  style={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  WatchList
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main", textUnderline: "none" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <Typography
                    color={theme.palette.secondary[100]}
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          color={theme.palette.secondary[300]}
        >
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberofMovieList={12} />
        ) : (
          <Box color={theme.palette.secondary[100]}>
            Sorry, Nothing was found
          </Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data.videos.results.length > 0 && (
          <Box
            component="iframe"
            autoPlay
            sx={{
              width: "50%",
              height: "50%",
              [theme.breakpoints.down("sm")]: {
                width: "90%",
                height: "90%",
              },
            }}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
