const pool = require("../db");
const bcrypt = require("bcryptjs");

module.exports = {
  getAll: async (req, res) => {
    const client = await pool.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, first_name, last_name, phone, email, user_authority FROM users"
      );

      res.json(rows);
    } catch (err) {
      console.log("Error getting users from database: ", err);
    } finally {
      await client.release();
    }
  },
  addUser: async (req, res) => {
    const { firstName, lastName, phone, email, password, userAuth } = req.body;
    const client = await pool.connect();

    //password encryption before adding to DB
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      const addUser = await client.query(
        "INSERT INTO users (first_name, last_name, phone, email, password_hash, user_authority) VALUES ($1, $2, $3, $4, $5, $6)",
        [firstName, lastName, phone, email, hash, userAuth]
      );

      res.json({
        msg: `${firstName} ${lastName} successfully added to the db`,
      });
    } catch (err) {
      console.log(
        `Failed to add ${firstName} ${lastName} to the database: `,
        "\n",
        err
      );
    } finally {
      await client.release();
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT id, first_name, last_name, phone, email, user_authority, password_hash FROM users WHERE id = $1",
        [id]
      );

      res.json(rows[0]);
    } catch (err) {
      console.log(`Failed to get user ${id}: `, "\n", err);
    } finally {
      await client.release();
    }
  },
};
