import React, { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  useMediaQuery,
  Drawer,
  useTheme,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  LightModeOutlined,
  DarkModeOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar, Search } from "..";
import { fetchToken, moviesApi, createSessionId } from "../../utils";
import { setUser, userSelector } from "../../features/auth";
import { setMode } from "../../features/mode";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 860px)");
  const isTooSmall = useMediaQuery("(max-width: 287px)");

  const theme = useTheme();
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const dispatch = useDispatch();
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
    setAnchorEl(null);
  };
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Toolbar
          sx={{
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "240px",
            [theme.breakpoints.down("md")]: {
              marginLeft: 0,
              flexWrap: "wrap",
              height: "auto",
              paddingBottom: "10px",
            },
          }}
        >
          {isTablet && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                marginRight: theme.spacing(2),
              }}
              display={isTooSmall ? "none" : "block"}
            >
              <MenuIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => dispatch(setMode())}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={fetchToken}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "none",
                    gap: "1rem",
                  }}
                >
                  {user.avatar.tmdb.avatar_path ? (
                    <Box
                      component={"img"}
                      src={`https://www.themoviedb.org/t/p/w45_and_h45_face${user.avatar.tmdb.avatar_path}`}
                      height="40px"
                      width="40px"
                      borderRadius="50%"
                      sx={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Avatar
                      alt="Profile"
                      src={`https://www.themoviedb.org/t/p/w45_and_h45_face${user.avatar.gravatar.hash}`}
                      height="40px"
                      width="40px"
                      borderRadius="50%"
                      sx={{
                        objectFit: "cover",
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.primary[900],
                      }}
                    >{`${user.username.charAt(0).toUpperCase()}`}</Avatar>
                  )}
                  <Box textAlign="left">
                    <Typography
                      fontSize="0.85rem"
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.secondary[100],
                        [theme.breakpoints.down("sm")]: {
                          display: "none",
                        },
                      }}
                    >
                      {user.name ? user.name.split(" ")[0] : user.username}
                    </Typography>
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  color={theme.palette.secondary[100]}
                >
                  <MenuItem
                    color="inherit"
                    component={Link}
                    to={`/profile/${user.id}`}
                    onClick={handleClose}
                  >
                    My Movies
                  </MenuItem>

                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <Box
          component={"nav"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: 0,
              flexShrink: 0,
            },
          }}
        >
          {isTablet ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </div>
    </>
  );
};

export default NavBar;
