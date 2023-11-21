import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

function Header(props) {

  return (
    <AppBar
      sx={{
        justifyContent: "center",
        position: "sticky",
        top: "0",
        marginBottom: "2vh",
      }}
    >
      <Toolbar
        style={{
          justifyContent: "center",
          padding: "0",
        }}
      >
        <Box
          component="img"
          src={props.themeMode ? "/pictures/Logo_Stramatel_White.png" : "/pictures/Logo_Stramatel_Dark.png"}
          alt="Logo"
          sx={{ width: "200px", height: "auto" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
