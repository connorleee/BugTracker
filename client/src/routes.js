import Index from "views/Index.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Administration from "views/Administration";
import Tickets from "views/Tickets";
import Project from "views/Project";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "general",
    root: "/admin",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-teal",
    component: Tickets,
    layout: "general",
    root: "/admin",
    display: true,
  },
  {
    path: "/administration",
    name: "Administration",
    icon: "ni ni-collection text-red",
    component: Administration,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "auth",
    root: "/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "auth",
    root: "/admin",
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
    layout: "general",
    root: "/admin",
    display: false,
  },
];
export default routes;
