/* eslint-disable max-len */
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { FeaturedMovie, MovieList, Pagination } from "..";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const theme = useTheme();
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress
          size="4rem"
          sx={{
            color: theme.palette.secondary[100],
          }}
        />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }
  if (error) {
    return "An error has occured";
  }
  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList
        movies={data}
        numberofMovieList={numberOfMovies}
        excludeFirst
      />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
