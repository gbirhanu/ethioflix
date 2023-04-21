import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcon from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import DarkLogo from "../../assets/dark_logo.png";
import LightLogo from "../../assets/light_logo.png";
const redLogo = DarkLogo;
const blueLogo = LightLogo;
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "UpComing", value: "upcoming" },
];
const Sidebar = ({ setMobileOpen }) => {
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);
  return (
    <>
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10% 0",
        }}
        onClick={() => {
          setMobileOpen(false);
        }}
      >
        <img
          style={{
            width: "70%",
          }}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="EthioFlix Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
        >
          Catagories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            style={{
              color: theme.palette.secondary[100],
              textDecoration: "none",
            }}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
              sx={{
                backgroundColor:
                  value === genreIdOrCategoryName
                    ? theme.palette.secondary[300]
                    : "transparent",
                color:
                  value === genreIdOrCategoryName
                    ? theme.palette.primary[600]
                    : theme.palette.secondary[100],
              }}
            >
              <ListItemIcon>
                <img
                  src={genreIcon[label.toLowerCase()]}
                  alt="logo"
                  style={{
                    filter: theme.palette.mode === "dark" && "invert(.5)",
                  }}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <ListSubheader
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
        >
          Genre
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={id}
              style={{
                color: theme.palette.secondary[100],
                textDecoration: "none",
              }}
              to="/"
            >
              <ListItem
                onClick={() => {
                  dispatch(selectGenreOrCategory(id));
                }}
                button
                sx={{
                  backgroundColor:
                    id === genreIdOrCategoryName
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    id === genreIdOrCategoryName
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon>
                  <img
                    src={genreIcon[name.toLowerCase()]}
                    alt="logo"
                    style={{
                      filter: theme.palette.mode === "dark" && "invert(.5)",
                    }}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
      <Divider />
    </>
  );
};

export default Sidebar;
