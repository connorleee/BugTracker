import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Projects from "views/Projects";
import Tickets from "views/Tickets";
import Project from "views/Project";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    display: true,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "ni ni-collection text-red",
    component: Projects,
    layout: "/admin",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-teal",
    component: Tickets,
    layout: "/admin",
    display: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    display: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    display: true,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/project/:id",
    Name: "Project",
    component: Project,
    layout: "/admin",
    display: false,
  },
];
export default routes;
