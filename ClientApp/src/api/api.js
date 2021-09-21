import axios from "axios";
// const apiBaseURL = "https://internlagbe.azurewebsites.net";
const apiBaseURL = "https://localhost:5001";

/* public queries */
export const GET = async (url) => {
  return await axios.get(`${apiBaseURL}/${url}`);
};

export const POST = async (url, payload) => {
  return await axios.post(`${apiBaseURL}/${url}`, payload);
};

/* private queries */
const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const GET_AUTH = async (url) => {
  return await axios.get(`${apiBaseURL}/${url}`, config);
};

export const POST_AUTH = async (url, payload) => {
  return await axios.post(`${apiBaseURL}/${url}`, payload, config);
};

// DELETE payload has to be sent in the headers
export const DELETE_AUTH = async (url, payload) => {
  return await axios.delete(`${apiBaseURL}/${url}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: payload,
  });
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
