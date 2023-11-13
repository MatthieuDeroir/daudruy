// veilleService.js
import config from "../config/config.json";
import { api } from "../helpers/api";

const API_URL = config.API_URL;

export const veilleService = {
  getVeille,
  updateVeille,
};

function getVeille() {
  return api
    .fetchWithAuthorization(`${API_URL}/api/veille/get-veille`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateVeille(daysToUpdate) {
    console.log("updateVeille",daysToUpdate);
  return api
    .fetchWithAuthorization(`${API_URL}/api/veille/update-days`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(daysToUpdate),
    })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y avait un problème avec l'opération fetch :", error);
}
