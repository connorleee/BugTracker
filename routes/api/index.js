const router = require("express").Router();
const projectRoutes = require("./project");
const userRoutes = require("./user");
const userProjectRoutes = require("./userProjects");
const ticketRoutes = require("./ticket");
const commentRoutes = require("./comment");
const devAssignmentsRoutes = require("./devAssignments");
const loginRoutes = require("./login");
const availableUsersRoutes = require("./availableUsers");
const authRoutes = require("./auth");

router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/userprojects", userProjectRoutes);
router.use("/tickets", ticketRoutes);
router.use("/comments", commentRoutes);
router.use("/devassignments", devAssignmentsRoutes);
router.use("/login", loginRoutes);
router.use("/availableUsers", availableUsersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
