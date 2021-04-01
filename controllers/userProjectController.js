const pool = require("../db");

module.exports = {
  assignUser: async (req, res) => {
    const { projectId } = req.params;
    const { userId } = req.body; // If there are multiple users to assign, this will be handled on front end
    const client = await pool.connect();

    try {
      await client.query(
        "INSERT INTO user_projects (project_id, user_id) VALUES ($1, $2)",
        [projectId, userId]
      );

      res
        .status(201)
        .json({ msg: `User ${userId} assigned to ${projectId} succesfully` });
    } catch (err) {
      console.log("assignUsers query error: ", err);
      res
        .status(400)
        .json({ msg: "Please review user project assign creation query" });
    } finally {
      await client.release();
    }
  },

  removeUser: async (req, res) => {
    const { id } = req.body;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM user_projects WHERE id = $1", [id]);

      res.json(`User removed from project`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({ msg: "Unable to remove user_project from database" });
    } finally {
      await client.release();
    }
  },
  getProjectUsers: async (req, res) => {
    const { projectId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT user_id, first_name, last_name, phone, email FROM users JOIN user_projects ON (user_projects.user_id = users.id) WHERE project_id = $1",
        [projectId]
      );

      res.json(rows);
    } catch (err) {
      console.log("getProjectUsers query error: ", err);
      res.status(400).json({ msg: "Please review query" });
    } finally {
      client.release();
    }
  },
};
