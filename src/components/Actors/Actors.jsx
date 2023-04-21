import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  Button,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  useGetActorDetailQuery,
  useGetMoviesByActoIdQuery,
} from "../../services/TMDB";
import { MovieList, Pagination } from "..";

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: movies } = useGetMoviesByActoIdQuery({ id, page });
  const navigate = useNavigate();
  const theme = useTheme();
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={theme.palette.secondary[100]}
      >
        {" "}
        <Button startIcon={ArrowBack} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            style={{
              borderRadius: "20px",
              boxShadow: "0.5em 0.5em 1em",
              maxWidth: "90%",
              objectFit: "cover",
            }}
            src={`https://image.tmdb.org/t/p/w780/${data.profile_path}`}
            alt={data.title}
          />
        </Grid>

        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            color={theme.palette.secondary[200]}
          >
            {data.name}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            color={theme.palette.secondary[100]}
          >
            Born: {new Date(data.birthday).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            align="justify"
            paragraph
            color={theme.palette.secondary[100]}
          >
            {data.biography || "Sorry No Biography Available"}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              target="_blank"
              href={`https://www.imdb.com/name/${data.imdb_id}`}
            >
              <Typography color={theme.palette.secondary[100]}>
                {" "}
                IMDB{" "}
              </Typography>
            </Button>
            <Button
              sx={{
                color: theme.palette.secondary[100],
              }}
              startIcon={<ArrowBack />}
              onClick={() => navigae(-1)}
            >
              <Typography color={theme.palette.secondary[100]}>Back</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          color={theme.palette.secondary[200]}
        >
          Movies
        </Typography>
        {movies && (
          <>
            <MovieList movies={movies} numberofMovieList={12} />
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={movies.total_pages}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Actors;
