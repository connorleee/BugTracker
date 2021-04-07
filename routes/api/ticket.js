const router = require("express").Router();
const ticketController = require("../../controllers/ticketController");

// Matches route with "/api/tickets/"
router
  .route("/:projectId")
  .post(ticketController.createTicket)
  .get(ticketController.getProjectTickets);

router
  .route("/:projectId/:ticketId")
  .get(ticketController.getTicket)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
