import { api } from "../helpers/api"; // Assurez-vous que le chemin d'importation est correct.
const API_URL = process.env.REACT_APP_API_URL;

export const slideshowService = {
  getSlideshow,
  createSlideshow,
  updateSlideshowMedia,
  deleteSlideshow,
  deleteMedia,
  updateMediaOrder,
  addPanneau
};

function getSlideshow() {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
  .catch(handleError);
}

function createSlideshow(data) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse)
  .catch(handleError);
}

function addPanneau(id) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/addPanneau/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
  .catch(handleError);
}

function updateMediaOrder(slideshowId, updatedOrder) {
  console.log("updateMediaOrder", slideshowId, updatedOrder);
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/${slideshowId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrder),
  })
  .then(response => response.json())
  .catch(error => console.error('Erreur lors de la mise à jour de l\'ordre', error));
}

function updateSlideshowMedia(slideshowId, mediaId, newDuration) {
  console.log("updateSlideshowMedia", slideshowId, mediaId, newDuration);
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/${slideshowId}/${mediaId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ duration: newDuration }),
  })
  .then(response => response.json())
  .catch(error => console.error('Erreur lors de la mise à jour du média', error));
}

function deleteSlideshow(slideshowId) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/${slideshowId}`, {
    method: "DELETE",
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

function deleteMedia(slideshowId , fileId) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/${slideshowId}/${fileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
  .catch(handleError);
}

function handleError(error) {
  console.error("Il y a eu un problème avec l'opération fetch :", error);
}
