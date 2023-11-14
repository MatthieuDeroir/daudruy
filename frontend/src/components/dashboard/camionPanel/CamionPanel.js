import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { camionService } from "../../../services/CamionServices";

function CamionPanel() {
  const [camionsData, setCamionsData] = useState([
    {
      immatriculation: "00000000",
      action: "wait",
      destination: "balance",
    },
    {
      immatriculation: "00000000",
      action: "wait",
      destination: "balance",
    },
    {
      immatriculation: "00000000",
      action: "wait",
      destination: "balance",
    },
  ]);

  const handleChange = (index) => (event) => {
    console.log("handleChange",event.target);
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setCamionsData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleActionSwitch = (index) => () => {
    setCamionsData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        action: newData[index].action === "wait" ? "go" : "wait",
      };
      return newData;
    });
  };

  const handleDestinationSwitch = (index) => () => {
    setCamionsData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        destination:
          newData[index].destination === "accueil" ? "balance" : "accueil",
      };
      return newData;
    });
  };

  const handleSubmit = () => {
    console.log("handleSubmit", camionsData);
    camionService.updateCamions(camionsData).then((data) => {});
  };

  useEffect(() => {
    camionService.getCamions().then((data) => {
      // Mettez à jour correctement l'état local avec les données reçues
      setCamionsData(data);
    });
  }, []);

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <EditCalendarIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: "text.primary" }}
              className="headerTitle"
            >
              {t("controlPanel")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton
              className="headerButton"
              onClick={() => {
                handleSubmit();
              }}
            >
              <SaveIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Stack>
        <Box
          className="containerPage"
          sx={{ paddingLeft: { xs: 2, sm: 4 }, paddingRight: { xs: 2, sm: 4 } }}
        >
          <form onSubmit={handleSubmit}>
            {camionsData.map((camion, index) => (
              <div key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={2}
                >
                  <Typography variant="body1">Immatriculation </Typography>
                  <TextField
                    style={{ width: "30%" }}
                    margin="normal"
                    type="text"
                    name={`immatriculation`}
                    value={camion.immatriculation}
                    onChange={handleChange(index)}
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={2}
                >
                  <Typography variant="body1">Action </Typography>
                  <Button
                    variant="contained"
                    onClick={handleActionSwitch(index)}
                  >
                    {camion.action === "wait" ? "Wait" : "Go"}
                  </Button>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={2}
                >
                  <Typography variant="body1">Destination </Typography>
                  <Button
                    variant="contained"
                    onClick={handleDestinationSwitch(index)}
                  >
                    {camion.destination === "accueil" ? "Balance" : "Accueil"}
                  </Button>
                </Box>
              </div>
            ))}
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default CamionPanel;
