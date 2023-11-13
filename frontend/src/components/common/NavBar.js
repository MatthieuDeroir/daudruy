import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
/* 
import AuthService from "../../services/authService";
import DisconnectDialog from "../dialogs/DisconnectDialog"; */


function NavBar() {
  const location = useLocation();  
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  function handleLogoutDialogOpen() {
    setLogoutDialogOpen(true);
  }

  function handleLogoutDialogClose() {
    setLogoutDialogOpen(false);
  }

  function logout() {
  localStorage.removeItem("token");
  }

  const getIconColor = (path) => {
    return location.pathname === path ?  "secondary.light"
    :"secondary.main"; // 'primary' est la couleur lorsque l'icône est active, 'action' quand elle ne l'est pas
  };


  return (
    <Box sx={{ position: "fixed", bottom: "0", width: "100%" }}>
      <BottomNavigation>
        <BottomNavigationAction
          component={Link}
          to="/dashboard"
          label="Dashboard"
           icon={<PermMediaIcon   sx={{ color: getIconColor("/dashboard") }}/>}
        />
        <BottomNavigationAction
          component={Link}
          to="/settings"
          label="Paramètres"
           icon={<SettingsIcon  sx={{ color: getIconColor("/settings") }}/>}
        />
        <BottomNavigationAction
          label="Déconnexion"
          onClick={logout}
           icon={<LogoutIcon sx={{ color:"secondary.main"}}  />} 
        />
      </BottomNavigation>
    </Box>
  );
}
export default NavBar;
