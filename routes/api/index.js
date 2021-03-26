const router = require("express").Router();
const projectRoutes = require("./project");
const userRoutes = require("./user");
const userProjectRoutes = require("./userProjects");
const ticketRoutes = require("./ticket");

router.use("/project", projectRoutes);
router.use("/user", userRoutes);
router.use("/userproject", userProjectRoutes);
router.use("/ticket", ticketRoutes);

module.exports = router;
