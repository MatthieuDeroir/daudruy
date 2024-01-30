import React from "react";

function CamionPage({ camionsData }) {
  const getFontSize = (
    text,
    sizeLarge,
    sizeMedium,
    sizeSmall,
    limitLarge,
    limitSmall
  ) => {
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
      fontSize: fontSize,
      margin: "0px",
      padding: "0px",
      overflow: "hidden",
    };

    // Assumption: Each character is around 10px wide when font size is "30px"
    // This is a rough estimation and may not be accurate for all fonts and characters
    const estimatedTextWidth = text.length * 10;

    if (fontSize === "30px" && estimatedTextWidth > 462) {
      style = {
        ...style,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      };
    }

    return style;
  };

  const DestinationIcon = ({ destination }) => {
    if (destination === "Accueil") {
      return (
        <img
          src={`./A.png`}
          alt="Acceuil"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else if (destination === "Balance") {
      return (
        <img
          src={`./B.png`}
          alt="Balance"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <table style={{ width: "432px", height: "216px", borderSpacing: "0px" }}>
      {camionsData.map((camion, index) =>
        camion.action === "go" ? (
          <tr key={index} style={{ height: "33%" }}>
            {" "}
            {/* Equal height for each row */}
            <td
              style={{
                width: "60%",
                ...getCellStyle(
                  camion.immatriculation,
                  getFontSize(
                    camion.immatriculation,
                    "50px",
                    "40px",
                    "30px",
                    9,
                    7
                  )
                ),
              }}
            >
              {camion.immatriculation}
            </td>
            <td style={{ width: "20%" }}>
              <img
                src="go.png" // Remplacez par le chemin réel de votre image
                alt="Go"
                style={{ height: "60px" }}
              />
            </td>
            {/* the content of the 3rd td must be align to the right*/}
            <td style={{ width: "20%", textAlign: "right" }}>
              <DestinationIcon destination={camion.destination} />
            </td>
          </tr>
        ) : (
          <tr key={index} style={{ height: "33%" }}></tr> // Ensure all rows have equal height
        )
      )}
    </table>
  );
}

export default CamionPage;
