import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { userService } from "../../services/UserServices";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    const username = "user";
    try {
      const user = await userService.signing(username, password);

      if (user) {
        console.log("Connecté avec succès", user.token);
        localStorage.setItem("token", JSON.stringify(user.token));
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);

      setError("Mot de passe incorrect");
    }
  }

  return (
    <Grid item>
      
      <Paper>
        <Box className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled>
              <LoginIcon
                sx={{ color: "primary.light" }}
                className="headerButton"
              />
            </IconButton>
            <Typography
              className="headerTitle"
              variant="h6"
              sx={{ color: "primary.light" }}
            >
              Connexion 
            </Typography>
          </Box>
        </Box>

        <Box className="centeredContainer">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: "35vh" }}>
              <TextField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
              <Typography
                variant="body2"
                sx={{
                  color: error ? "error.main" : "transparent",
                  textAlign: "center",
                  height: "1.5em",
                }}
              >
                {error || " "}
              </Typography>
              <Button type="submit" sx={{ color: "secondary.main" }}>
                Se connecter
              </Button>
            </FormControl>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
