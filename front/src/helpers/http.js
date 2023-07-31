import axios from "axios"

export const baseURL = "https://rektor.tkti.uz/api/"
export const imgBaseURL = "https://rektor.tkti.uz/"
export const foreignBaseURL = "https://backend.tkti.uz/"
export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`${baseURL}${url}`, data);
    return res.ok ? res.json() : res.json();
  } catch ({ message }) {
    return message;
  }
};
export const http = axios.create({
    baseURL: baseURL,
});