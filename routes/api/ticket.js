const router = require("express").Router();
const ticketController = require("../../controllers/ticketController");

// Matches route with "/api/tickets/"
router
  .route("/:projectId")
  .post(ticketController.createIssue)
  .get(ticketController.getProjectIssues);

router
  .route("/:projectId/:ticketId")
  .put(ticketController.updateIssue)
  .delete(ticketController.deleteIssue);

module.exports = router;
