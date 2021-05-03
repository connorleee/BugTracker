const router = require("express").Router();
const apiRoutes = require("./api");
const authorization = require("../middleware/authorization");

// API Routes
router.use("/api", apiRoutes);

// Auth Routes
router.get("/auth/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
