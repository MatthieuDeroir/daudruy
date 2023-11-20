import React, { useEffect, useState } from "react";
import { camionService } from "./services/CamionService";
import { slideshowService } from "./services/SlideshowService";
import { veilleService } from "./services/VeilleService";
import CamionPage from "./pages/CamionPage";
import MediasPage from "./pages/MediasPage";
import { slideshowStatutsService } from "./services/SlideshowStatutsService";

function App() {
  const [camionsData, setCamionsData] = useState([]);
  const [isVeilleMode, setIsVeilleMode] = useState(false);

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
        setCurrentSlideshow(foundSlideshow);
        console.log(foundSlideshow);
      } else setCurrentSlideshow({});
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Le diaporama actuel a été mis à jour :", currentSlideshow);
  
    const mediaInterval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % (currentSlideshow.media?.length || 1));
    }, currentSlideshow.media && currentSlideshow.media.length > 0
      ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
      : 5000);
  
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
    {isVeilleMode ? (
      <p>Vous êtes actuellement dans la période de veille.</p>
    ) : (
      currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media._id}
            style={{
              display: index === currentMediaIndex ? "block" : "none",
            }}
          >
            {media.type === "Panneau" ? (
              <p>Ce média est un panneau</p>
            ) : (
              <img src={"../../../frontend/public"+media.path} alt={`Media ${media._id}`} />
            )}
          </div>
        ))
      ) : (
        <p>Aucun média disponible dans le diaporama.</p>
      )
    )}
  </div>
  );
}

export default App;
