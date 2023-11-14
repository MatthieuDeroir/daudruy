import React, { useEffect } from 'react';

function CamionPage({ camionsData }) {

  return (
    <div>
      {camionsData.map((camion, index) => (
        <div key={index}>
          <p>Immatriculation: {camion.immatriculation}</p>
          <p>Action: {camion.action}</p>
          <p>Destination: {camion.destination}</p>
        </div>
      ))}
    </div>
  );
}

export default CamionPage;
