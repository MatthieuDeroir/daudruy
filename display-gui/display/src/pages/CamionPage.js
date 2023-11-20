import React, { useEffect, useRef, useState } from "react";

function CamionPage({ camionsData }) {
  const [fontSize, setFontSize] = useState("50px");
  const tdRef = useRef(null);

  useEffect(() => {
    if (tdRef.current) {
      const width = tdRef.current.offsetWidth;
      console.log('width', width);

      if (width > 80) {
         setFontSize("40px");
        if (width > 80) {
          setFontSize("30px");
        }
      } else {
        setFontSize("50px");
      }
    }
  }, [camionsData]);

  return (
    <table style={{ width: "480px", height: "240px", borderSpacing: "0px" }}>
      {camionsData.map((camion, index) =>
        camion.action === "go" ? (
          <tr key={index} style={{ height: "60px" }}>
            <td
              ref={tdRef}
              style={{
                textAlign: "center",
                width: "55%",
                fontSize: fontSize,
                margin: "-30px",
                padding: "0px",
              }}
            >
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
            <td
              style={{
                width: "25%",
                fontSize: "30px",
                height: "60px",
                padding: "0px",
              }}
            >
              {camion.destination}
            </td>
          </tr>
        ) : (
          <tr key={index} style={{ height: "60px" }}></tr>
        )
      )}
    </table>
  );
}

export default CamionPage;
