const router = require("express").Router();
const ticketController = require("../../controllers/ticketController");

// Matches route with "/api/issue/"
router.route("/").get((req, res) => res.send("ya made it to issue API"));

router
  .route("/:projectId")
  .post(ticketController.createIssue)
  .get(ticketController.getProjectIssues);

router
  .route("/:ticketId")
  .put(ticketController.updateIssue)
  .delete(ticketController.deleteIssue);

module.exports = router;
