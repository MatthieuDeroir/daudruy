const API_URL = process.env.REACT_APP_API_URL;

const TOKEN = JSON.parse(localStorage.getItem('token')); // Récupère le token du localStorage et enlève les guillemets

export const mediaService = {
  uploadMedia,
  deleteMedia
};


function uploadMedia(file, slideshowId) {
    const formData = new FormData();
    formData.append('file', file); // 'file' est le nom du champ attendu côté serveur
    formData.append('slideshowId', slideshowId); // 'slideshowId' est le nom du champ attendu côté serveur

    return fetch(`${API_URL}/api/media/upload`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
        },
        body: formData // Envoi du fichier comme FormData
    })
    .then(handleResponse)
    .catch(handleError);
}


function deleteMedia(mediaId) {
  return fetch(`${API_URL}/api/media/${mediaId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas OK");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y a eu un problème avec l'opération de récupération :", error);
}
