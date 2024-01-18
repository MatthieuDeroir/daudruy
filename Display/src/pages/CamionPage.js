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

  const getCellStyle = (text, fontSize) =>
{
    let style = {
      textAlign: "center",
      width: "55%",
      fontSize: fontSize,
      margin: "-30px",
      padding: "0px"
    };

    // Assumption: Each character is around 10px wide when font size is "30px"
    // This is a rough estimation and may not be accurate for all fonts and characters
    const estimatedTextWidth = text.length * 10;

    if (fontSize === "30px" && estimatedTextWidth > 462) {
      style = {...style, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"};
    }

    return style;
  };

    const DestinationIcon = ({ destination }) => {
        if (destination === 'Accueil') {
            return <img src={`./A.png`} alt="Acceuil" style={{width: "60px", height: "60px"}} />;
        } else if (destination === 'Balance') {
            return <img src={`./B.png`} alt="Balance" style={{width: "60px", height: "60px"}} />;
        } else {
            return null;
        }
    };

  return (
    <table style={{ width: "432", height: "216", borderSpacing: "0px" }}>
      {camionsData.map((camion, index) =>
        camion.action === "go" ? (
          <tr key={index} style={{ height: "60px" }}>
            <td style={getCellStyle(camion.immatriculation, getFontSize(camion.immatriculation, "50px", "40px", "30px", 9, 7))}>
              {camion.immatriculation}
            </td>
            <td style={{ width: "20%", padding: "0px" }}>
                <img
                    src="go.png" // Remplacez par le chemin réel de votre image
                    alt="Go"
                    style={{ transform: "rotate(90deg)" }}
                />
              {/*<div*/}
              {/*  style={{*/}
              {/*    width: "0px",*/}
              {/*    height: "0px",*/}
              {/*    borderLeft: "25px solid transparent",*/}
              {/*    borderRight: "25px solid transparent",*/}
              {/*    borderBottom: "50px solid #00a13b",*/}
              {/*    position: "relative",*/}
              {/*    transform: "rotate(90deg)",*/}
              {/*  }}*/}
              {/*>*/}


              {/*</div>*/}
            </td>
            <td>
                <DestinationIcon destination={camion.destination} />
            </td>
          </tr>
        ) : <tr key={index} style={{ height: "60px" }}></tr>
      )}
    </table>
  );
}

export default CamionPage;