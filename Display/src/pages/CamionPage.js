import React from "react";

function CamionPage({ camionsData }) {
  const getFontSize = (text, sizeLarge, sizeMedium, sizeSmall, limitLarge, limitSmall) => {
    if (text.length > limitLarge) {
      return sizeSmall;
    } else if (text.length > limitSmall) {
      return sizeMedium;
    } else {
      return sizeLarge;
    }
  };

  const getCellStyle = (text, fontSize) => {
    let style = {
      textAlign: "center", 
      width: "55%", 
      fontSize: fontSize, 
      margin: "-30px", 
      padding: "0px"
    };
    
    const estimatedTextWidth = text.length * 10;
    if (fontSize === "30px" && estimatedTextWidth > 462) {
      style = {...style, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"};
    }
    return style;
  };

  const DestinationIcon = ({ destination }) => {
    if (destination === 'Accueil') {
      return <img src={`./accueil.png`} alt="Accueil" style={{width: "30px", height: "30px"}} />;
    } else if (destination === 'Balance') {
      return <img src={`./balance.png`} alt="Balance" style={{width: "30px", height: "30px"}} />;
    } else {
      return null;
    }
  };

  return (
    <table style={{ width: "480px", height: "240px", borderSpacing: "0px" }}>
      {camionsData.map((camion, index) =>
        camion.action === "go" ? (
          <tr key={index} style={{ height: "60px" }}>
            <td style={getCellStyle(camion.immatriculation, getFontSize(camion.immatriculation, "50px", "40px", "30px", 9, 7))}>
              {camion.immatriculation}
            </td>
            <td style={{ width: "20%", padding: "0px" }}>
              <div
                style={{
                  width: "0px",
                  height: "0px",
                  borderLeft: "25px solid transparent",
                  borderRight: "25px solid transparent",
                  borderBottom: "50px solid #00a13b",
                  position: "relative",
                  transform: "rotate(90deg)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "25px",
                    left: "-15px",
                    width: "30px",
                    color: "#fff",
                    textAlign: "center",
                    transform: "rotate(-90deg)",
                    fontSize: "14px",
                  }}
                >
                  Go
                </span>
              </div>
            </td>
            <td style={{ width: "25%", height: "60px", padding: "0px", textAlign: 'center' }}>
              <DestinationIcon destination={camion.destination} />
            </td>
          </tr>
        ) : <tr key={index} style={{ height: "60px" }}></tr>
      )}
    </table>
  );
}

export default CamionPage;