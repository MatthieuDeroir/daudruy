import React, { useState, useEffect } from 'react';

function TestPage() {
  const colors = ['#FF0000', '#00FF00', '#0000FF']; // RGB colors
  const [colorIndex, setColorIndex] = useState(0);
  const width = process.env.REACT_APP_WIDTH;
    const height = process.env.REACT_APP_HEIGHT;

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 2000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: width + 'px',
        height: height + 'px',
        backgroundColor: colors[colorIndex],
      }}
    />
  );
}

export default TestPage;