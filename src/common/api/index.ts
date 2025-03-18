import axios from 'axios';

export const API = {
  get : async function (endPoint: string) {      
    return await axios.get(import.meta.env.BASE_URL + endPoint)
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },
}