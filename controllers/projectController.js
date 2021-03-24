const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  getAll: (req, res) => {
    pool.connect().then((client) => {
      return client
        .query("SELECT * FROM projects")
        .then((results) => {
          client.release();
          res.json(results.rows);
        })
        .catch((e) => {
          client.release();
          console.log("getProject query error: ", e);
          return res
            .status(500)
            .json({ msg: "Unable to get projects from database" });
        });
    });
  },
  createProject: (req, res) => {
    // const { name, description } = req.body;

    //May need some logic to ensure project doesn't already exist

    pool.connect().then((client) => {
      return client
        .query("INSERT INTO projects (name, description) VALUES ($1, $2)", [
          req.body.name,
          req.body.description,
        ])
        .then((results) => {
          client.release();
          return res.status(201).json({ msg: "Project created succesfully" });
        })
        .catch((e) => {
          client.release();
          console.log("createProject query error: ", e);
          return res
            .status(400)
            .json({ msg: "Please review project creation query" });
        });
    });
  },
  deleteProject: (req, res) => {
    const id = req.params.id;

    pool.connect().then((client) => {
      return client
        .query("DELETE FROM projects WHERE id = $1", [id])
        .then((results) => {
          client.release();
          res.json(results.rows);
        })
        .catch((e) => {
          client.release();
          console.log("deleteProject query error: ", e);
          return res.status(500).json({ msg: "Project deletion failed" });
        });
    });
  },
};
