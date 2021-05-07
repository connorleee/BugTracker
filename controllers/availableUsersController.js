const pool = require("../db");

module.exports = {
  getAvailableUsers: async function (req, res) {
    const client = await pool.connect();

    const { projectId } = req.params;

    try {
      const {
        rows,
      } = await client.query(
        "SELECT id, email, first_name, last_name FROM users as U WHERE NOT EXISTS (SELECT user_id FROM user_projects as UP WHERE UP.user_id = U.id AND UP.project_id = $1)",
        [projectId]
      );

      res.status(201).json(rows);
    } catch (err) {
      console.log(err);
      res.send(500).json({ msg: "Failed to fetch available users" });
    }
  },
};
