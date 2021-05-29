const router = require("express").Router();
const commentController = require("../../controllers/commentController");
const authorization = require("../../middleware/authorization");

// Matches route with "/api/comments/"
router
  .route("/:ticketId")
  .post(authorization, commentController.createComment)
  .get(authorization, commentController.getTicketComments);

router
  .route("/:ticketId/:commentId")
  .put(authorization, commentController.updateComment)
  .delete(authorization, commentController.deleteComment);

module.exports = router;
