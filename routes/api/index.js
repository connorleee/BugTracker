const router = require("express").Router();
const projectRoutes = require("./project");
const userRoutes = require("./user");
const issueRoutes = require("./issue");

router.use("/project", projectRoutes);
router.use("/user", userRoutes);
router.use("/issue", issueRoutes);

module.exports = router;
