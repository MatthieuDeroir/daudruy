import React, { useEffect, useState } from "react";
import { Grid, Paper, Stack, Box, IconButton, Typography, Switch, Slider, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LockIcon from "@mui/icons-material/Lock";
import StorageIcon from "@mui/icons-material/Storage";
import BugReportIcon from "@mui/icons-material/BugReport";
import PhoneIcon from "@mui/icons-material/Phone";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import { useThemeMode } from "../../context/ThemeModeContext";
import { veilleService } from "../../services/VeilleService";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";

function Settings() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [veille, setVeille] = useState({});
  const totalSize = 100; // Taille totale en Go
  const usedSize = 90; // Taille utilisée en Go
  const { themeMode, toggleTheme } = useThemeMode();

  useEffect(() => {
    veilleService.getVeille().then((response) => {
      const veilleData = response[0];
      if (veilleData && veilleData.start && veilleData.stop) {
        setVeille({
          ...veilleData,
          start: convertToSliderFormat(veilleData.start),
          stop: convertToSliderFormat(veilleData.stop),
        });
      } else {
        console.error('Les données de la veille ne sont pas définies');
      }
    }).catch((error) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const convertToSliderFormat = (timeString) => {
    if (timeString && !isNaN(timeString)) {
      return Number(timeString);
    }
    return 0;
  };

  const convertFrom24HourFormat = (timeValue) => {
    return `${timeValue}:00`; // Ajout de ":00" pour indiquer les minutes
  };

  const handleSliderChange = (event, newValue) => {
    console.log("handleSliderChange", newValue);
    const updatedVeille = {
      ...veille,
      start: newValue[0],
      stop: newValue[1],
    };
    console.log("updatedVeille", updatedVeille);
    setVeille(updatedVeille);
    veilleService.updateVeille(updatedVeille).then((response) => {});
  };

  const handleVeilleChange = (event) => {
    const updatedVeille = { ...veille, enable: event.target.checked ? true : false };
    setVeille(updatedVeille);
    veilleService.updateVeille(updatedVeille).then((response) => {});
  };

  const percentage = (usedSize / totalSize) * 100;

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
      <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <SettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {t("settingsOf")}
              </Typography>
            </Box>
          </Stack>
          <Box
            className="containerPage"
            sx={{
              paddingLeft: { xs: 2, sm: 6 },
              paddingRight: { xs: 2, sm: 6 },
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Stack spacing={2}>
                  {/* <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <LockIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography
                      variant="h8"
                      sx={{
                        color: "text.primary",
                        textTransform: "none",
                        padding: "0",
                      }}
                    >
                      {t("changePassword")}
                    </Typography>
                  </Stack> */}
                  <Stack
                    onClick={toggleTheme}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <DarkModeIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("darkMode")}
                      </Typography>
                    </Stack>
                    <Switch checked={themeMode === "dark"} color="secondary" />
                  </Stack>
                 {/*  <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <StorageIcon sx={{ color: "text.secondary" }} />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("usedStorageSpace")}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        color={percentage > 80 ? "error" : "secondary"}
                      />
                    </Box>
                  </Stack> */}
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton disabled>
                      <BugReportIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography variant="h8" sx={{ color: "text.primary" }}>
                      Test panneau
                    </Typography>
                  </Stack>

                  <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  ></Stack>
                 
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    onClick={handleVeilleChange}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <ModeNightIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography> Veille</Typography>
                    </Stack>
                    <Switch
                      color="secondary"
                      checked={veille.enable === true}
                      onChange={handleVeilleChange}
                    />
                  </Stack>
                  <Stack>
                    <Slider
                      m={5}
                      color="secondary"
                      value={[veille.start, veille.stop]}
                      min={0}
                      max={24}
                      step={0.01}
                      marks={[
                        { value: 0, label: "0h" },
                        { value: 6, label: "6h" },
                        { value: 12, label: "12h" },
                        { value: 18, label: "18h" },
                        { value: 24, label: "24h" },
                      ]}
                      valueLabelDisplay="auto"
                      onChange={handleSliderChange}
                      disabled={veille.enable === false}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton disabled>
                      <PhoneIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography variant="h8" sx={{ color: "text.primary" }}>
                      0123456789
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  {/*   <ChangePasswordDialog open={modalOpen} onClose={toggleModal} /> */}
    </>
  );
}

export default Settings;
