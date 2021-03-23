const router = require("express").Router();

// Matches route with "/api/issue/"
router.route("/").get((req, res) => res.send("ya made it to issue API"));

module.exports = router;
