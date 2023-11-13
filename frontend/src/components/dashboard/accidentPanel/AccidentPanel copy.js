import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { accidentService } from "../../../services/AccidentServices";

function AccidentPanel() {
  const [accidentData, setAccidentData] = useState({
    numberOfAccidentsSinceStartOfTheYear: 0,
    daysWithoutAccident: 0,
    recordDaysWithoutAccident: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setAccidentData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = () => {
    accidentService.updateAccident(accidentData).then((data) => {

    });
  };
  useEffect(() => {
    accidentService.getAccident().then((data) => {

      const accidentData = data[0];
      setAccidentData({
        numberOfAccidentsSinceStartOfTheYear: accidentData.numberOfAccidentsSinceStartOfTheYear,
        daysWithoutAccident: accidentData.daysWithoutAccident,
        recordDaysWithoutAccident: accidentData.recordDaysWithoutAccident,
      });
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Typography variant="body1">Nombre d'accidents </Typography>
              <TextField
                style={{ width: "30%" }}
                margin="normal"
                type="number"
                name="numberOfAccidentsSinceStartOfTheYear"
                value={accidentData.numberOfAccidentsSinceStartOfTheYear}
                onChange={handleChange}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Typography variant="body1">Jours sans accident </Typography>
              <TextField
                style={{ width: "30%" }}
                margin="normal"
                type="number"
                name="daysWithoutAccident"
                value={accidentData.daysWithoutAccident}
                onChange={handleChange}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Typography variant="body1">Record de jours </Typography>
              <TextField
                style={{ width: "30%" }}
                margin="normal"
                type="number"
                name="recordDaysWithoutAccident"
                value={accidentData.recordDaysWithoutAccident}
                onChange={handleChange}
              />
            </Box>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default AccidentPanel;
