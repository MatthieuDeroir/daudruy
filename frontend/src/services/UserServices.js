import { api } from "../helpers/api"; // Assurez-vous que le chemin d'importation est correct.

const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  signing,
  signup,
  changePassword
};

function signing(username, password) {
  // Remarque : JSON.stringify devrait prendre un objet, pas deux arguments séparés.
  return api
    .fetchWithAuthorization(`${API_URL}/api/auth/signing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then(handleResponse) // Utilisez handleResponse pour garder la cohérence.
    .then((user) => {
      console.log("user", user);
      // Sauvegardez le token dans le localStorage ou gérez l'utilisateur comme vous le souhaitez ici.
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      return user;
    })
    .catch((error) => {
      console.error("Il y a eu un problème avec l'opération fetch :", error);
    });
}

function signup(user) {
  return api
    .fetchWithAuthorization(`${API_URL}/api/auth/signup`, {
      // Assurez-vous que l'URL est correcte.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(handleResponse) // Utilisez handleResponse pour garder la cohérence.
    .then((user) => {
      // Sauvegardez le token dans le localStorage ou gérez l'utilisateur comme vous le souhaitez ici.
      return user;
    });
}

function changePassword(oldPassword,newPassword) {
  return api
    .fetchWithAuthorization(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({oldPassword, newPassword }),
    })
    .then(handleResponse)
    
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // Ici, vous pouvez gérer les erreurs spécifiques si nécessaire.
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
