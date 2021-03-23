const router = require("express").Router();

// Matches route with "/api/user/"
router.route("/").get((req, res) => res.send("ya made it to User API"));

module.exports = router;
