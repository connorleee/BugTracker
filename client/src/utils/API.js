import axios from "axios";

const API = {
  // Gets all projects
  getProjects: function (url) {
    return fetch(url).then((res) => res.json());
  },
  // Gets the project with the given id
  getProject: function (id) {
    return axios.get("http://localhost:3001/api/projects/" + id);
  },
  getProjectUsers: function (url) {
    return fetch(url).then((res) => res.json());
  },
  createProject: function (projectData) {
    return axios.post("http://localhost:3001/api/projects", projectData);
  },
  // Deletes the user with the given id
  deleteUser: function (userId, contactId) {
    return axios.delete(
      "http://localhost:3001/api/users/" + userId + "/" + contactId
    );
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("http://localhost:3001/api/users", userData);
  },
  addContact: function (id, data) {
    return axios.put("http://localhost:3001/api/users/" + id, data);
  },
};

export default API;
