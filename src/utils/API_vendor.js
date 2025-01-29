import axios from "axios";

export async function makePostAPIcall (url,payload){
    try {
        const response = await axios.post(url, {
        ...payload,
        });
        return response;
      } catch (error) {
        return error;
      }
}

export async function makeGetAPIcall (url){
  try {
      const response = await axios.get(url,{
        headers: {
          'Cache-Control': 'no-store', // Ensures fresh data in SSR
        },
      });
      return response;
    } catch (error) {
      return error;
    }
}


const API = axios.create({ baseURL: "http://localhost:8080",withCredentials: true });
export const googleLogin = () => API.get("/auth/google");
export const refreshToken = () => API.get("/auth/refresh");
