class Api {
  async fetchWithAuthorization(url, options) {
    const accessToken = JSON.parse(localStorage.getItem('token'));
    const headers = new Headers(options.headers || {});

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(url, {
      ...options,
      headers: headers,
    });

    if (!response.ok && response.status === 401) {
      console.log("La réponse a un statut de 401");
      localStorage.removeItem("token");
    }

    return response;
  }
}

export const api = new Api();
