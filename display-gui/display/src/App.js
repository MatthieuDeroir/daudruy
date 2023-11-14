import React, { useEffect, useState } from "react";
import { camionService } from "./services/CamionService";
import { slideshowService } from "./services/SlideshowService";
import { veilleService } from "./services/VeilleService";
import CamionPage from "./pages/CamionPage";
import MediasPage from "./pages/MediasPage";

function App() {
  const [camionsData, setCamionsData] = useState([]);
  const [slideshow, setSlideshow] = useState({});
  const [veille, setVeille] = useState({});
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      const [veilleRes, camionsRes, slideshowRes] = await Promise.all([
        veilleService.getVeille(),
        camionService.getCamions(),
        slideshowService.getSlideshow(),
      ]);
  
      setVeille(veilleRes[0]);
      setIsVeilleMode(checkIsInVeillePeriod(veilleRes[0]));
      setCamionsData(camionsRes);
      setSlideshow(slideshowRes.data.slideshows);
      console.log(slideshowRes.data.slideshows);
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []); 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slideshow.media.length);
    }, slideshow.media[currentSlideIndex].duration * 1000);

    return () => clearInterval(interval);
  }, [currentSlideIndex, slideshow.media]);
  const checkIsInVeillePeriod = (veilleData) => {
    if (!veilleData.enable) {
      return false;
    }

    const currentHour = new Date().getHours();
    const startHour = parseInt(veilleData.start.split(":")[0], 10);
    const stopHour = parseInt(veilleData.stop.split(":")[0], 10);

    return currentHour >= startHour && stopHour <= currentHour;
  };

  const currentMedia = slideshow.media[currentSlideIndex];

  return (
    <div>
      {isVeilleMode ? (
        <p>Vous êtes actuellement dans la période de veille.</p>
      ) : ({currentMedia.type === 'Panneau' ? (null) : (null)})}


    </div>
  );
}

export default App;
