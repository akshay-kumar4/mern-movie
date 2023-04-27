import React, { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/Menu";
import themeConfigs from "../../configs/Theme";
import { setAuthModalOpen } from "../../redux/features/AuthModal";
import { setMode } from "../../redux/features/Theme";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeConfigs.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeConfigs.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const TopBar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const onSwicthTheme = () => {
    const theme =
      themeMode === themeConfigs.dark ? themeConfigs.light : themeConfigs.dark;
    dispatch(setMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <Menu />
              </IconButton>
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwicthTheme}>
                {themeMode === themeConfigs.dark && <DarkModeOutlined />}
                {themeMode === themeConfigs.light && <WbSunnyOutlined />}
              </IconButton>
            </Box>
            <Stack>
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign In
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default TopBar;
