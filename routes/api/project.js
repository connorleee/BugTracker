const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches route with "/api/project/"
router
  .route("/")
  .get(projectController.getAll)
  .post(projectController.createProject);

router.route("/:id").delete(projectController.deleteProject);

module.exports = router;
