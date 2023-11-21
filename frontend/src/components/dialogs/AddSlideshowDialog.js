import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function AddSlideshowDialog({ open, onClose, AddSlideshow }) {
  const [name, setName] = React.useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un diaporama</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Nom du diaporama"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setName("");
          }}
          sx={{ color: "secondary.main" }}
        >
          Annuler
        </Button>
        <Button
          onClick={() => {
            AddSlideshow(name);
            setName("");
          }}
          sx={{ color: "secondary.main" }}
          disabled={!name.trim()}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSlideshowDialog;
