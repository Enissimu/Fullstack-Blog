import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

export const setToken = (tokenparam) => {
  token = `Bearer ${tokenparam}`;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const sendComment = async ({ comm, id }) => {
  const uriel = `${baseUrl}/${id}/comments`;
  const response = await axios.post(
    uriel,
    {
      comm,
    },
    {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Headers": "Authorization",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const sendBlog = async (newBlog) => {
  const response = await axios({
    method: "post",
    url: baseUrl,
    data: newBlog,
    headers: {
      Authorization: token,
      "Access-Control-Allow-Headers": "Authorization",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateLikes = async ({ newBlog, id }) => {
  const response = await axios({
    method: "put",
    url: `${baseUrl}/${id}`,
    data: newBlog,
    headers: {
      Authorization: token,
      "Access-Control-Allow-Headers": "Authorization",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios({
    method: "delete",
    url: `${baseUrl}/${id}`,
    headers: {
      Authorization: token,
      "Access-Control-Allow-Headers": "Authorization",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
