const router = require("express").Router();
const devAssignmentsController = require("../../controllers/devAssignmentsController");

// Matches route with "/api/assigneddev/"
router.route("/").delete(devAssignmentsController.removeDev);

// Matches route with "/api/assigneddev/:ticketId"
router
  .route("/:ticketId")
  .post(devAssignmentsController.assignDev)
  .get(devAssignmentsController.getAssignedDevs)
  .delete(devAssignmentsController.removeAllDevs);

module.exports = router;
