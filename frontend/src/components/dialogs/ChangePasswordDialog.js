import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";

import { userService } from "../../services/UserServices";


function ChangePasswordDialog({ open, onClose }) {
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    onClose();
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Appeler le service d'authentification pour changer le mot de passe
    userService
      .changePassword(newPassword)
      .then(() => {
        setError("");
        onClose();
      })
      .catch((error) => {
        console.log("Erreur", error.response.data.message);
        setError(error.response.data.message);
      });
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifier mot de passe</DialogTitle>
      <DialogContent sx={{ padding: "0px 20px" }}>
        <FormControl sx={{minWidth:"40vh"}}>
          <TextField
            sx={{ marginTop: "16px" }}
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            sx={{ marginTop: "16px" }}
            label="Confirme mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{ color: "secondary.main" }}
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>

    
  );
}

export default ChangePasswordDialog;