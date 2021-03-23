const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches route with "/api/project/"
router
  .route("/")
  .get(projectController.getAll)
  .post(projectController.createProject);

module.exports = router;
