const pool = require("../db");

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

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
  getProject: (req, res) => {},
  createProject: (req, res) => {
    const { name, description } = req.body;

    //May need some logic to ensure project doesn't already exist

    pool.connect().then((client) => {
      return client
        .query("INSERT INTO projects (name, description) VALUES ($1, $2)", [
          name,
          description,
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
  updateProject: async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    const client = await pool.connect();

    try {
      const updateProject = await client.query(
        "UPDATE projects SET (name, description) = ($1, $2) WHERE id = $3",
        [name, description, id]
      );

      res.json("Projected updated successfully");
    } catch (e) {
      console.log("updateProject query error: ", e);
      return res
        .status(400)
        .json({ msg: "Please review project update query" });
    } finally {
      client.release();
    }
  },
};
