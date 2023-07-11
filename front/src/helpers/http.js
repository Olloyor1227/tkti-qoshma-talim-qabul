import axios from "axios"

export const baseURL = "https://luckydeveloper.uz/api/"
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