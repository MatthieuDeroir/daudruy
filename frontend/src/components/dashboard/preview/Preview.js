import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { t } from 'i18next'

import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import React from 'react'

function Preview() {
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
              {t("preview")}
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
         
        </Box>
      </Paper>
    </Grid>
  </>
  )
}

export default Preview