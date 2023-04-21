import React, { useState, useEffect } from "react";
import { InputBase, IconButton, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../features/currentGenreOrCategory";
import { useTheme } from "@mui/material/styles";

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };
  const handleOnClick = () => {
    dispatch(searchMovie(query));
  };
  if (location.pathname != "/") return null;
  return (
    <Box
      component="div"
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
      >
        <InputBase
          onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <IconButton onClick={handleOnClick}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Search;
