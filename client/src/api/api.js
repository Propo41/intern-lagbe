import axios from "axios";
const apiBaseURL = "https://localhost:5001";

export const GET = async (url) => {
  return await axios.get(`${apiBaseURL}/${url}`);
};



export const POST = async (url, payload) => {
  return await axios.post(`${apiBaseURL}/${url}`, payload);
};




/* // if need for headers etc.

const headers = "some headers";

export const POST = (url, data) => {
  return axios(`${apiBaseURL}/${url}`, {
    method: "POST",
    headers,
    data,
  });
};
 */