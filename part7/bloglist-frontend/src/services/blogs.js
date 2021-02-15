import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const request = await axios.post(baseUrl, newObject, config);
    return request.data;
};

const update = async (id, updatedBlog) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);

    return response.data;
};

const deleteBlog = async (id) => {
    const config = { headers: { Authorization: token } };
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    return request.data;
};

const comment = async (id, comment) => {
    const config = {
        headers: { Authorization: token, "Content-Type": "text/plain" },
    };
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config);

    return response.data;
};

export default { getAll, create, update, setToken, deleteBlog, comment };
