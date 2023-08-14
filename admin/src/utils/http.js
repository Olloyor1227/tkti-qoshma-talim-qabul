export const baseURL = "http://localhost:5000/api/";
export const imgBaseURL = "http://localhost:5000/";

// export const baseURL = "https://tkti-qoshma-talim-qabul-47sy.vercel.app/api/";
// export const imgBaseURL = "https://tkti-qoshma-talim-qabul-47sy.vercel.app/";

export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`${baseURL}${url}`, data);  
    return res.json() 
  } catch (e) {
    return new Error("Server bilan aloqa yo'q")
  }
};
