import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AccidentPanel from "./accidentPanel/AccidentPanel";
import Preview from "./preview/Preview";
import SlideshowList from "./slideshow/SlideshowList";
import { use } from "i18next";
import SlideshowConfig from "./slideshow/SlideshowConfig";
import { slideshowService } from "../../services/SlideshowService";

function Dashboard() {
  const [slideshow, setSlideshow] = useState(null);
  const [slideshows, setSlideshows] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        
        getSlideshow();
      } catch (error) {
        console.error("Erreur lors de la récupération du slideshow:", error);
      }
    }
    fetchData();
  }, [slideshow]);

  async function getSlideshow() {
    console.log("getSlideshow");
    await slideshowService.getSlideshow().then((data) => {
      console.log("data", data);
      setSlideshows(data.data.slideshows);
    });
  }

  async function setCurrentSlideshow(currentSlideshow) {
    console.log("setCurrentSlideshow", currentSlideshow);
    setSlideshow(currentSlideshow);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <AccidentPanel />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Preview />
      </Grid>
      <Grid item xs={12} sm={4}>
        {slideshow ? (
          <SlideshowConfig
            slideshow={slideshow}
            setSlideshow={setSlideshow}
            getSlideshow={getSlideshow}
            setCurrentSlideshow={setCurrentSlideshow}
          />
        ) : (
          <SlideshowList
            slideshows={slideshows}
            setSlideshows={setSlideshows}
            setSlideshow={setSlideshow}
            getSlideshow={getSlideshow}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
