import axios from "axios";

const API = {
  // Gets all projects
  getProjects: function () {
    return fetch("/api/projects", {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  // Gets the project with the given id
  getProject: function (id) {
    return axios.get("/api/projects/" + id, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  },
  getProjectUsers: function (projectId) {
    return fetch(`/api/userProjects/${projectId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  },
  getProjectTickets: function (projectId) {
    return fetch("/api/tickets/" + projectId).then((res) => res.json());
  },
  createProject: function (projectData) {
    return fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(projectData),
    }).then((res) => res.json());
  },
  updateProject: function (projectId, projectData) {
    return fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(projectData),
    });
  },
  saveUser: function (userData) {
    return axios.post("bug-tracker-cl.herokuapp.com/api/users", userData);
  },
  addContact: function (id, data) {
    return axios.put("/api/users/" + id, data);
  },
  getTicket: function (projectId, ticketId) {
    return fetch(`/api/tickets/${projectId}/${ticketId}`).then((res) =>
      res.json()
    );
  },
  getTicketComments: function (ticketId) {
    return fetch(`/api/comments/${ticketId}`).then((res) => res.json());
  },
  getDevAssignments: function (ticketId) {
    return fetch(`/api/devassignments/${ticketId}`).then((res) => res.json());
  },
  createTicket: function (projectId, payload) {
    return fetch(`/api/tickets/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  updateTicket: function (projectId, ticketId, payload) {
    return fetch(`/api/tickets/${projectId}/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  },
  deleteTicket: function (projectId, ticketId) {
    return fetch(`/api/tickets/${projectId}/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  createDevAssignment: function (ticketId, devId) {
    return fetch(`/api/devassignments/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(devId),
    }).then((res) => res.json());
  },
  removeAllDevAssignments: function (ticketId) {
    return fetch(`/api/devassignments/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  login: function (userInfo) {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userInfo),
    });
  },
  getAvailableUsers: function (projectId) {
    return fetch("/api/availableUsers/" + projectId).then((res) => res.json());
  },
  addTeamMember: function (projectId, userId) {
    return fetch("/api/userprojects/" + projectId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(userId),
    });
  },
  removeTeamMember: function (projectId, userId) {
    return fetch(`/api/userprojects/${projectId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  removeAllTeamMembers: function (projectId) {
    return fetch(`/api/userprojects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  getUsers: function () {
    return fetch("/api/users").then((res) => res.json());
  },
  lookupUserByEmail: function (email) {
    return fetch(`bug-tracker-cl.herokuapp.com/api/auth/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((res) => res.json());
  },
  deleteProject: function (projectId) {
    return fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  },
  addUser: function (userData) {
    return fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },
};

export default API;
