import './App.css';
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import {useEffect, useState} from "react";
function App() {
    const [showTrucks, setShowTrucks] = useState(true);
    const [mediaIndex, setMediaIndex] = useState(0);
    const [medias, setMedias] = useState([]);
    const [totalTruckPages, setTotalTruckPages] = useState(1);
    const [currentTruckPage, setCurrentTruckPage] = useState(0);
    const [fetchedTrucks, setFetchedTrucks] = useState([]);
    const [settings, setSettings] = useState([]);
    const [debutVeille, setDebutVeille] = useState(0);
    const [finVeille, setFinVeille] = useState(0);
    const [dureeDefilement, setDureeDefilement] = useState(30);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:4000/settings');
            const data = await response.json();
            setSettings(data);
            setDebutVeille(settings.debutVeille);
            setFinVeille(settings.finVeille);
            setDureeDefilement(settings.dureeDefilement);
            console.log("App.fetchSettings: data:", data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }

    }

    const fetchTrucks = async () => {
        try {
            const response = await fetch('http://localhost:4000/camions');
            const data = await response.json();
            setFetchedTrucks(data);
            console.log("App.fetchTrucks: data:", data);
            const totalPages = Math.ceil(data.length / 10);
        } catch (error) {
            console.error('Error fetching trucks:', error);
        }
    };

    const handleMediaEnd = () => {
        setMediaIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % medias.length;
            if (nextIndex === 0) {
                setShowTrucks(true); // Retourner à l'affichage des camions
                setCurrentTruckPage(0);
                fetchTrucks(); // Refetch les camions
            }
            return nextIndex;
        });
    };

    const fetchMedias = async () => {
        try {
            const response = await fetch('http://localhost:4000/media-management/');
            const data = await response.json();
            setMedias(data);
            console.log("App.fetchMedias: data:", data);
        } catch (error) {
            console.error('Error fetching medias:', error);
        }
    };

    useEffect(() => {
        fetchTrucks(); // Fetch initial des camions
        fetchMedias(); // Fetch initial des médias
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (showTrucks) {
                setCurrentTruckPage((prevPage) => {
                    const nextPage = (prevPage + 1) % totalTruckPages;
                    if (nextPage === 0 && medias.length > 0) {
                        setShowTrucks(false);
                        setMediaIndex(0);
                        fetchMedias();
                    }
                    return nextPage;
                });
            } else {
                handleMediaEnd(); // Utilisez votre fonction handleMediaEnd ici
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [showTrucks, mediaIndex, medias.length, totalTruckPages]);

    return (
        <div className="App">
            {showTrucks ? <TruckList setCurrentPage={setCurrentTruckPage} setTotalPages={setTotalTruckPages} currentPage={currentTruckPage} fetchedTrucks={fetchedTrucks}/> :
                <MediaDisplay media={medias[mediaIndex] || null} onMediaEnd={handleMediaEnd}/>}
        </div>
    );
}

export default App;
