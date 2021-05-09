const router = require("express").Router();
const userProjectController = require("../../controllers/userProjectController");
const authorization = require("../../middleware/authorization");

// Matches route with "/api/userProjects/"
router.route("/").delete(userProjectController.removeUser);

// Matches route with "/api/userProjects/:projectId"
router
  .route("/:projectId")
  .post(authorization, userProjectController.assignUser)
  .get(userProjectController.getProjectUsers);

module.exports = router;
