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

  // nouvel état pour suivre si des modifications ont été faites
  const [changesMade, setChangesMade] = useState(false);

  const handleChange = (index) => (event) => {
    const { name, value } = event.target;
    setCamionsData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });

    // set changesMade to true lorsque des modifications sont faites
    setChangesMade(true);
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

    // set changesMade to true lorsque des modifications sont faites
    setChangesMade(true);
  };

  const handleDestinationSwitch = (index) => () => {
    setCamionsData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        destination:
          newData[index].destination === "Accueil" ? "Balance" : "Accueil",
      };
      return newData;
    });

    // set changesMade to true lorsque des modifications sont faites
    setChangesMade(true);
  };

  const handleSubmit = () => {
    camionService.updateCamions(camionsData).then((data) => {});

    // set changesMade back to false après la soumission du formulaire
    setChangesMade(false);
  };

  useEffect(() => {
    camionService.getCamions().then((data) => {
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
              Panneau de contrôle des camions
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton
              className="headerButton"
              onClick={handleSubmit}
              disabled={!changesMade} // grise le bouton si aucune modification n'a été faite
            >
              <SaveIcon
                sx={{ color: changesMade ? "secondary.main" : "#808080" }}
              />
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
                  <TextField
                    style={{ width: "40%" }}
                    margin="normal"
                    type="text"
                    name={`immatriculation`}
                    value={camion.immatriculation}
                    onChange={handleChange(index)}
                  />

                  <Button
                    style={{ width: "5%" }}
                    onClick={handleActionSwitch(index)}
                    sx={{ color: "secondary.main" }}
                  >
                    {camion.action === "wait" ? "Wait" : "Go"}
                  </Button>

                  <Button
                    style={{ width: "15%" }}
                    onClick={handleDestinationSwitch(index)}
                    sx={{ color: "secondary.main" }}
                  >
                    {camion.destination}
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
