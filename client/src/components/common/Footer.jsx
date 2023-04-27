import React from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "../../configs/Menu";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                component={Link}
                to={item.path}
                key={index}
                sx={{ color: "inherit" }}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
