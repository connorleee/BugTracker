const pool = require("../db");

module.exports = {
  getAll: async (req, res) => {
    const { firstName, lastName, phone, email, password, userAuth } = req.body;
    const client = pool.connect();

    try {
      const { rows } = await client.query(
        "SELECT (first_name, last_name, phone, email, userAuth) FROM users"
      );

      res.json(rows);
    } catch (err) {
      console.log("Error getting users from database: ", err);
    } finally {
      await client.release();
    }
  },
  addUser: async (req, res) => {},
};
