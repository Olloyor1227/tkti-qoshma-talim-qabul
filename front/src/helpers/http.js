import axios from "axios"

export const baseURL = "http://localhost:5000/api/"
export const imgBaseURL = "http://localhost:5000/"
export const foreignBaseURL = "https://backend.tkti.uz/"
export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`${baseURL}${url}`, data);
    return res.ok ? res.json() : res;
  } catch ({ message }) {
    return message;
  }
};
export const http = axios.create({
    baseURL: baseURL,
});