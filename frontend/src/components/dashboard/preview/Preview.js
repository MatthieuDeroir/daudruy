<<<<<<< HEAD
=======
import {Box, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
>>>>>>> a40fdc2d8a68c6b05b26ff9aab2029857ddcf2d2
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
const DISPLAY_URL = process.env.REACT_APP_DISPLAY_URL;

function Preview() {
<<<<<<< HEAD
  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <VideoLabelIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                Aperçu
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
            <iframe
              src="http://localhost:3001"
              title="Preview"
              style={{ border: "none", height: "240px", width: "480px" }}
            ></iframe>
          </Box>
        </Paper>
      </Grid>
    </>
  );
=======
    return (
        <>
            <Grid item xs={12}>
                <Paper className="mainPaperPage">
                    <Stack className="herderTitlePage">
                        <Box className="headerLeft">
                            <IconButton disabled className="headerButton">
                                <VideoLabelIcon sx={{color: "primary.light"}}/>
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{color: "text.primary"}}
                                className="headerTitle"
                            >
                                Aperçu
                            </Typography>
                        </Box>
                    </Stack>
                    <Box
                        className="containerPage"
                        sx={{
                            paddingLeft: {xs: 2, sm: 6},
                            paddingRight: {xs: 2, sm: 6},
                        }}
                    >
                        <iframe
                            src={DISPLAY_URL}
                            title="Preview"
                            style={{border: "none", height: "240px", width: "480px"}}
                        ></iframe>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
>>>>>>> a40fdc2d8a68c6b05b26ff9aab2029857ddcf2d2
}

export default Preview;
