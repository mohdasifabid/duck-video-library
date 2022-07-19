import axios from "axios";

export const getCall = async (endPoint) => {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.get(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

export const postCall = async (endPoint, requestBody) => {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.post(endPoint, requestBody, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

export const deleteCall = async (endPoint) => {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.delete(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};
