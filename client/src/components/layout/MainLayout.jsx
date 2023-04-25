import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import TopBar from "../common/TopBar";

const MainLayout = () => {
  return (
    <>
      <GlobalLoading />
      <Box display="flex" minHeight="100vh">
        <TopBar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
