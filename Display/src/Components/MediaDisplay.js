import React, { useState, useEffect } from 'react';
import './MediaDisplay.css';

function MediaDisplay({ media, onMediaEnd }) {
    const [secondsLeft, setSecondsLeft] = useState(media ? media.duration : 0);

    useEffect(() => {
        setSecondsLeft(media ? media.duration : 0); // Réinitialisez le compte à rebours chaque fois que le média change

        if (!media) return;

        const intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(intervalId);
                    onMediaEnd && onMediaEnd();
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [media, onMediaEnd]);

    if (!media) {
        return <div className="media-container">No media available</div>;
    }

    return (
        <div className="media-container">
            {media.type === 'image' ? (
                <img src={`http://localhost:4000/${media.path}`} alt="Media" />
            ) : (
                <video src={`http://localhost:4000/${media.path}`} autoPlay muted />
            )}
            <div className="timer">{secondsLeft}</div>
        </div>
    );
}

export default MediaDisplay;
