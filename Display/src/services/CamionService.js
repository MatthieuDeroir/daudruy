

const API_URL = process.env.REACT_APP_API_URL;

export const camionService = {
  getCamions,
};

function getCamions() {
  return fetch(`${API_URL}/api/camion`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas correcte");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y a eu un problème avec l'opération fetch :", error);
}
