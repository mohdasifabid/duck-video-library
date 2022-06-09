import axios from "axios";
const token = localStorage.getItem("encodedToken");

export const getCall = async (endPoint) => {
  const response = await axios.get(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};
