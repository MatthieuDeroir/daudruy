import config from "../config/config.json";
import { api } from "../helpers/api";

const API_URL = config.API_URL;

export const accidentService = {
  getAccident,
  updateAccident,
};

function getAccident() {
  return api
    .fetchWithAuthorization(`${API_URL}/api/accident`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateAccident(dataToUpdate) {
  return api
    .fetchWithAuthorization(`${API_URL}/api/accident`, {
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
