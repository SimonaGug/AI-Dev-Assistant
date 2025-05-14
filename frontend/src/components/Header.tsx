import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => (
  <AppBar position="static" color="primary">
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography variant="h4" component="div">
        AI Coding Assistant
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
