

const API_URL = process.env.REACT_APP_API_URL;

export const slideshowStatutsService = {
  getSlideshowStatus,
  updateSlideshowStatus,
};

function getSlideshowStatus() {
  return fetch(`${API_URL}/api/slideshow-status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function updateSlideshowStatus(dataToUpdate) {
  return fetch(`${API_URL}/api/slideshow-status`, {
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
    throw new Error("La réponse du réseau n'était pas correcte");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y a eu un problème avec l'opération fetch :", error);
}
