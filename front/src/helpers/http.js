import axios from "axios"

export const baseURL = "https://api-qabul.tkti.uz/api/"
export const imgBaseURL = "https://api-qabul.tkti.uz/"

// export const baseURL = "http://localhost:5000/api/"
// export const imgBaseURL = "http://localhost:5000/"

export const foreignBaseURL = "https://backend.tkti.uz/"
export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`${baseURL}${url}`, data);
    return res.json()
  } catch (e) {
    return new Error("Server bilan aloqa yo'q");
  }
};
export const http = axios.create({
    baseURL: baseURL,
});