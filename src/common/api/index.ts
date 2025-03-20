import axios from 'axios';

export const API = {
  get : async function (endPoint: string) {    
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_API_URL + endPoint);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      } else {
        throw error;
      }
    }
  },
}
