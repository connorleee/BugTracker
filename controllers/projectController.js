const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  getAll: async (req, res) => {
    try {
      const projects = await pool.query("SELECT * FROM projects");
      res.json(projects.rows);
    } catch (err) {
      console.error(err);
    }
  },
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
          res.json(results.rows);
        })
        .catch((e) => {
          client.release();
          console.log("createProject error: ", e);
        });
    });
  },
};
