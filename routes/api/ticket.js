const router = require("express").Router();
const ticketController = require("../../controllers/ticketController");
const authorization = require("../../middleware/authorization");

// Matches route with "/api/tickets/"
router
  .route("/:projectId")
  .post(authorization, ticketController.createTicket)
  .get(ticketController.getProjectTickets);

router
  .route("/:projectId/:ticketId")
  .get(ticketController.getTicket)
  .put(authorization, ticketController.updateTicket)
  .delete(authorization, ticketController.deleteTicket);

module.exports = router;
