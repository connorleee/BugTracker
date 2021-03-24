const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches route with "/api/user/"
router.route("/").get(userController.getAll).post(userController.addUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
