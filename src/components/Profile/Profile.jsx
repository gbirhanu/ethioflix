import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, useTheme, Box } from "@mui/material";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWachlistMovies } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });
  useEffect(() => {
    refetchFavorites();
    refetchWachlistMovies();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.secondary[200]}
        >
          My Profile
        </Typography>
      </Box>
      {!favoriteMovies && !watchlistMovies ? (
        <Typography
          variant="h5"
          gutterBottom
          color={theme.palette.secondary[100]}
        >
          Add Favorite or Watchlist some movies to see them
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
