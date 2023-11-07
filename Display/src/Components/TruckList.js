import React, { useState, useEffect } from 'react';
import './TruckList.css';

function TruckList({ currentPage, setCurrentPage, setTotalPages, fetchedTrucks }) {
    const [trucks, setTrucks] = useState(fetchedTrucks);
    const [secondsLeft, setSecondsLeft] = useState(5);
    const pageDuration = 5; // 5 secondes par page

    useEffect(() => {
        setTrucks(fetchedTrucks); // Mettez à jour les camions lorsque fetchedTrucks change
    }, [fetchedTrucks]);

    useEffect(() => {
        console.log("TruckList.useEffect: fetchedTrucks:", fetchedTrucks);
        const totalPages = Math.ceil(trucks.length / 10);
        const pageIntervalId = setInterval(() => {
            if (trucks.length > 0) { // Vérifier si trucks.length est supérieur à 0
                setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
                setSecondsLeft(pageDuration); // Réinitialiser le compte à rebours à chaque changement de page
            }
        }, pageDuration * 1000);

        const secondIntervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => {
            clearInterval(pageIntervalId);
            clearInterval(secondIntervalId);
        };
    }, [trucks.length, setCurrentPage]);

    return (
        <div className="grid-container">
            <div className="header transporteur">Transporteur</div>
            <div className="header immat">Immat</div>
            <div className="header quai">Quai</div>
            {trucks.slice(currentPage * 10, (currentPage + 1) * 10).map(truck => (
                <React.Fragment key={truck.id}>
                    <div className="item">{truck.transporteur}</div>
                    <div className="item">{truck.immatriculation}</div>
                    <div className="item">{truck.quai}</div>
                </React.Fragment>
            ))}
            <div className="footer">Page {currentPage + 1} / {Math.ceil(trucks.length / 10)}</div>
            <div className="footer">Changement dans {secondsLeft} secondes</div>
        </div>
    );
}

export default TruckList;
