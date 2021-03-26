const router = require("express").Router();
const commentController = require("../../controllers/commentController");

// Matches route with "/api/issue/"
router
  .route("/")
  .post(commentController.createComment)
  .get(commentController.getIssueComments);

router
  .route("/:commentId")
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
