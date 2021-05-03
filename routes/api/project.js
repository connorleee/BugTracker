const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches route with "/api/projects/"
router
  .route("/")
  .get(projectController.getAll)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
