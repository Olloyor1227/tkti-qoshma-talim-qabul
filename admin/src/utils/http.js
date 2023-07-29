export const baseURL = "http://localhost:5000/api/";
export const imgBaseURL = "http://localhost:5000/";

export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`${baseURL}${url}`, data);  
    return res.ok ? res.json() : res.json();
  } catch ({ message }) {
    return message;
  }
};
