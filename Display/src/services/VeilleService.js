import config from "../config/config.json";
const API_URL = config.API_URL;

export const veilleService = {
  getVeille,
};

function getVeille() {
  return fetch(`${API_URL}/api/veille/get-veille`, {
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
