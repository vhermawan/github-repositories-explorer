import axios from 'axios';

export const API = {
  get : async function (endPoint: string) {    
    return await axios.get(import.meta.env.VITE_BASE_API_URL + endPoint)
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },
}