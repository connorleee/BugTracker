const pool = require("../db");

module.exports = {
  getAll: async (req, res) => {
    const client = await pool.connect();

    try {
      const { rows } = await client.query("SELECT * FROM projects");

      res.json(rows);
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({ msg: "Unable to get projects from database" });
    } finally {
      await client.release();
    }
  },
  getProject: async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query("SELECT * FROM projects WHERE id = $1", [id]);

      res.json(rows[0]);
    } catch (e) {
      console.log("getProject query error: ", e);
      res.status(400).json({
        msg: "Unable to get project from database. Please review query",
      });
    } finally {
      await client.release();
    }
  },
  createProject: async (req, res) => {
    const { name, description } = req.body;
    const client = await pool.connect();
    //May need some logic to ensure project doesn't already exist

    try {
      const result = await client.query(
        "INSERT INTO projects (name, description) VALUES ($1, $2)",
        [name, description]
      );

      res.status(201).json({ msg: "Project created succesfully" });
    } catch (err) {
      console.log("createProject query error: ", err);
      res.status(400).json({ msg: "Please review project creation query" });
    } finally {
      await client.release();
    }
  },
  deleteProject: async (req, res) => {
    const id = req.params.id;
    const client = await pool.connect();

    try {
      const deleteProject = await client.query(
        "DELETE FROM projects WHERE id = $1",
        [id]
      );

      res.status(200).json({ msg: `Project ${id} succesfully deleted` });
    } catch (err) {
      console.log("deleteProject query error: ", err);
      res.status(500).json({ msg: `Project deletion of ${id} failed` });
    } finally {
      await client.release();
    }
  },
  updateProject: async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    const client = await pool.connect();

    try {
      const updateProject = await client.query(
        "UPDATE projects SET (name, description) = ($1, $2) WHERE id = $3",
        [name, description, id]
      );

      res.json(`Project: ${name} updated successfully`);
    } catch (e) {
      console.log("updateProject query error: ", e);
      res.status(400).json({ msg: "Please review project update query" });
    } finally {
      await client.release();
    }
  },
};
