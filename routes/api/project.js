const router = require("express").Router();
const projectController = require("../../controllers/projectController");
const authorization = require("../../middleware/authorization");

// Matches route with "/api/projects/"
router
  .route("/")
  .get(
    // authorization,
    projectController.getAll
  )
  .post(authorization, projectController.createProject);

router
  .route("/:id")
  .get(authorization, projectController.getProject)
  .put(authorization, projectController.updateProject)
  .delete(authorization, projectController.deleteProject);

module.exports = router;
