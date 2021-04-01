const router = require("express").Router();
const userProjectController = require("../../controllers/userProjectController");

// Matches route with "/api/userProject/"
router.route("/").delete(userProjectController.removeUser);

// Matches route with "/api/userProject/:projectId"
router
  .route("/:projectId")
  .post(userProjectController.assignUser)
  .get(userProjectController.getProjectUsers);

module.exports = router;
