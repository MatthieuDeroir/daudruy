import { api } from "../helpers/api";

const API_URL = process.env.REACT_APP_API_URL;


export const camionService = {
  getCamions,
  updateCamions,
};

function getCamions() {
  return api
    .fetchWithAuthorization(`${API_URL}/api/camion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateCamions(dataToUpdate) {
  return api
    .fetchWithAuthorization(`${API_URL}/api/camion`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("There was a problem with the fetch operation:", error);
}
