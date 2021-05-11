import axios from "axios";

const API = {
  // Gets all projects
  getProjects: function () {
    return fetch("http://localhost:3001/api/projects", {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  // Gets the project with the given id
  getProject: function (id) {
    return axios.get("http://localhost:3001/api/projects/" + id, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  },
  getProjectUsers: function (projectId) {
    return fetch(`http://localhost:3001/api/userProjects/${projectId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  getProjectTickets: function (projectId) {
    return fetch("http://localhost:3001/api/tickets/" + projectId).then((res) =>
      res.json()
    );
  },
  createProject: function (projectData) {
    return fetch("http://localhost:3001/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(projectData),
    }).then((res) => res.json());
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("http://localhost:3001/api/users", userData);
  },
  addContact: function (id, data) {
    return axios.put("http://localhost:3001/api/users/" + id, data);
  },
  getTicket: function (projectId, ticketId) {
    return fetch(
      `http://localhost:3001/api/tickets/${projectId}/${ticketId}`
    ).then((res) => res.json());
  },
  getTicketComments: function (ticketId) {
    return fetch(`http://localhost:3001/api/comments/${ticketId}`).then((res) =>
      res.json()
    );
  },
  getDevAssignments: function (ticketId) {
    return fetch(
      `http://localhost:3001/api/devassignments/${ticketId}`
    ).then((res) => res.json());
  },
  createTicket: function (projectId, payload) {
    return fetch(`http://localhost:3001/api/tickets/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  updateTicket: function (projectId, ticketId, payload) {
    return fetch(`http://localhost:3001/api/tickets/${projectId}/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  deleteTicket: function (projectId, ticketId) {
    return fetch(`http://localhost:3001/api/tickets/${projectId}/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  createDevAssignment: function (ticketId, devId) {
    return fetch(`http://localhost:3001/api/devassignments/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(devId),
    }).then((res) => res.json());
  },
  removeAllDevAssignments: function (ticketId) {
    return fetch(`http://localhost:3001/api/devassignments/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  login: function (userInfo) {
    return fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userInfo),
    });
  },
  getAvailableUsers: function (projectId) {
    return fetch(
      "http://localhost:3001/api/availableUsers/" + projectId
    ).then((res) => res.json());
  },
  addTeamMember: function (projectId, userId) {
    return fetch("http://localhost:3001/api/userprojects/" + projectId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userId),
    });
  },
  removeTeamMember: function (projectId, userId) {
    return fetch(
      `http://localhost:3001/api/userprojects/${projectId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  },
  getUsers: function () {
    return fetch("http://localhost:3001/api/users").then((res) => res.json());
  },
  deleteProject: function (projectId) {
    return fetch(`http://localhost:3001/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
};

export default API;
