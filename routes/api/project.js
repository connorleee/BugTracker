const router = require("express").Router();

// Matches route with "/api/project/"
router.route("/").get((req, res) => res.send("ya made it"));

module.exports = router;
