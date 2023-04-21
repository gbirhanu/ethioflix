import React, { useMemo, useRef } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { Actors, NavBar, MovieInformation, Movies, Profile } from "./index";
import useAlan from "./Alan";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const alanBtnContainer = useRef();
  useAlan();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Box
          component="main"
          sx={{
            flexGrow: "1",
            padding: "2em",
            width: "100%",
            backgroundColor: theme.palette.background.alt,
            [theme.breakpoints.down("sm")]: {
              paddingTop: "3rem",
            },
          }}
        >
          <div
            style={{
              height: "70px",
            }}
          />
          <Routes>
            <Route path="/*" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Box>
        <div ref={alanBtnContainer} />
      </ThemeProvider>
    </div>
  );
};

export default App;
