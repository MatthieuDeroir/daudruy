import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function AddSlideshowDialog({ open, onClose, AddSlideshow}) {
  const [name, setName] = React.useState("");
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("addNewEvent")}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          fullWidth
          id="standard-basic"
          label={t("eventName")}
          autoComplete="off"
          
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose(); setName("");}} sx={{ color: "secondary.main" }}>
          {t("cancel")}
        </Button>
        <Button onClick={() => {AddSlideshow(name); setName("");}} sx={{ color: "secondary.main" }} disabled={!name.trim()}>
          {t("add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSlideshowDialog;
