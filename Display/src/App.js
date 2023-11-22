import React, { useEffect, useState } from "react";
import { camionService } from "./services/CamionService";
import { slideshowService } from "./services/SlideshowService";
import { veilleService } from "./services/VeilleService";
import _ from "lodash";
import CamionPage from "./pages/CamionPage";
import MediasPage from "./pages/MediasPage";
import { slideshowStatutsService } from "./services/SlideshowStatutsService";
import "./Global.css";
import TestPage from "./pages/TestPage";

function App() {
  const [camionsData, setCamionsData] = useState([]);
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [veilleRes, camionsRes, slideshowRes, slideshowStatusRes] =
        await Promise.all([
          veilleService.getVeille(),
          camionService.getCamions(),
          slideshowService.getSlideshow(),
          slideshowStatutsService.getSlideshowStatus(),
        ]);

      setIsVeilleMode(checkIsInVeillePeriod(veilleRes[0]));
      setCamionsData(camionsRes);
      const currentSlideshowId = slideshowStatusRes[0]?.slideshowId;
      if (slideshowStatusRes[0]?.isRunning) {
        const foundSlideshow = slideshowRes.data.slideshows.find(
          (slideshow) => slideshow._id === currentSlideshowId
        );
    

        // Vérifie si le diaporama actuel est le même que le précédent
        if (!_.isEqual(currentSlideshow, foundSlideshow)) {
          setCurrentSlideshow(foundSlideshow);
          setCurrentMediaIndex(0);
        }
      } else if (!_.isEmpty(currentSlideshow)) {
        // Si le diaporama n'est plus en cours, réinitialise currentSlideshow
        setCurrentSlideshow({});
      }
      if (slideshowStatusRes[0]?.isTesting) {
        setIsTesting(true);
      }else{
        setIsTesting(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [currentSlideshow]);

  useEffect(() => {

    const mediaInterval = setInterval(
      () => {
        setCurrentMediaIndex(
          (prevIndex) => (prevIndex + 1) % (currentSlideshow.media?.length || 1)
        );
      },
      currentSlideshow.media && currentSlideshow.media.length > 0
        ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
        : 5000
    );

    return () => clearInterval(mediaInterval);
  }, [currentSlideshow, currentMediaIndex]);

  const checkIsInVeillePeriod = (veilleData) => {
    if (!veilleData.enable) {
      return false;
    }
    const currentHour = new Date().getHours();
    const startHour = parseInt(veilleData.start.split(":")[0], 10);
    const stopHour = parseInt(veilleData.stop.split(":")[0], 10);

    return currentHour >= startHour && stopHour <= currentHour;
  };

  return (
    <div>
      {isTesting? (<TestPage/>):(isVeilleMode ? (
       <></>
      ) : currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media._id}
            style={{
              maxHeight: "240px",
              display: index === currentMediaIndex ? "block" : "none",
              maxWidth: "480px"
             
            }}
          >
            {media.type === "Panneau" ? (
              <CamionPage camionsData={camionsData} />
            ) : (
              <MediasPage media={media} />
            )}
          </div>
        ))
      ) : (
        <CamionPage camionsData={camionsData} />
      ))}
    </div>
  );
}

export default App;
