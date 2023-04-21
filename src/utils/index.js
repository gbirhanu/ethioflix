import axios from "axios";

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_APP_TMDB_KEY,
  },
});
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get("/authentication/token/new");
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=https://ethioflix.onrender.com/approved`;
    }
  } catch (error) {
    console.log("Sorry, your token could not be created.");
  }
};

export const createSessionId = async () => {
  try {
    const requestToken = localStorage.getItem("request_token");
    const { data } = await moviesApi.post("/authentication/session/new", {
      request_token: requestToken,
    });
    const sessionId = data.session_id;
    if (data.success) {
      localStorage.setItem("session_id", sessionId);
      return sessionId;
    }
  } catch (error) {
    console.log("Sorry, your session could not be created.");
  }
};
