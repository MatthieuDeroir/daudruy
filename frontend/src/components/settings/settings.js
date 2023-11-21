import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Stack,
  Box,
  IconButton,
  Typography,
  Switch,
  Slider,
  CircularProgress,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import BugReportIcon from "@mui/icons-material/BugReport";
import PhoneIcon from "@mui/icons-material/Phone";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LockIcon from "@mui/icons-material/Lock";

import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";
import { useThemeMode } from "../../context/ThemeModeContext";
import { veilleService } from "../../services/VeilleService";
import { slideshowStatutsService } from "../../services/SlideshowStatutsService";

function Settings() {
  const [veille, setVeille] = useState({});
  const { themeMode, toggleTheme } = useThemeMode();
  const [modalOpen, setModalOpen] = useState(false);
  const [slideshowToPlay, setSlideshowToPlay] = useState({});
  useEffect(() => {
    slideshowStatutsService.getSlideshowStatus().then((data) => {
      console.log("data", data[0]);
      setSlideshowToPlay(data[0]);
    });
    veilleService
      .getVeille()
      .then((response) => {
        const veilleData = response[0];
        if (veilleData && veilleData.start && veilleData.stop) {
          setVeille({
            ...veilleData,
            start: convertToSliderFormat(veilleData.start),
            stop: convertToSliderFormat(veilleData.stop),
          });
        } else {
          console.error("Les données de la veille ne sont pas définies");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  useEffect(() => {}, []);

  const convertToSliderFormat = (timeString) => {
    if (timeString && !isNaN(timeString)) {
      return Number(timeString);
    }
    return 0;
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
    const updatedVeille = {
      ...veille,
      enable: event.target.checked ? true : false,
    };
    setVeille(updatedVeille);
    veilleService.updateVeille(updatedVeille).then((response) => {});
  };
  function playSlideshow(isTesting) {
    const data = {
      slideshowId: slideshowToPlay.slideshowId,
      isRunning: false,
      isTesting: isTesting,
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }
  function stopSlideshow(isTesting) {
    const data = {
      slideshowId: slideshowToPlay.slideshowId,
      isRunning: false,
      isTesting: isTesting,
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
                  Paramètres
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
                          Thème sombre
                        </Typography>
                      </Stack>
                      <Switch
                        checked={themeMode === "dark"}
                        color="secondary"
                      />
                    </Stack>
                    <Stack  onClick={toggleModal} direction="row" alignItems="center" spacing={3}>
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
                        Changer mot de passe
                      </Typography>
                    </Stack>
                    <Stack
                      onClick={toggleTheme}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Stack spacing={3} direction="row" alignItems="center">
                        <IconButton disabled>
                          <BugReportIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                        <Typography variant="h8" sx={{ color: "text.primary" }}>
                          Test panneau
                        </Typography>
                      </Stack>
                      {slideshowToPlay.isTesting ? (
                        <IconButton
                          sx={{ p: 0 }}
                          size="big"
                          onClick={(e) => {
                            e.stopPropagation();
                            stopSlideshow(false);
                          }}
                        >
                          <StopIcon
                            sx={{ fontSize: 40, color: "secondary.main" }}
                          />
                          <CircularProgress
                            size={40}
                            sx={{
                              left: -0.5,
                              position: "absolute",
                              color: "secondary.main",
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playSlideshow(true);
                          }}
                        >
                          <PlayArrowIcon
                            sx={{ fontSize: 30, color: "secondary.main" }}
                          />
                        </IconButton>
                      )}
                    </Stack>

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
                        step={1}
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
        <ChangePasswordDialog open={modalOpen} onClose={toggleModal} />
    </>
  );
}

export default Settings;
