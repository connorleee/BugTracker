const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches route with "/api/auth/user"
router.route(`/user`).post(userController.lookupUserByEmail);

module.exports = router;
