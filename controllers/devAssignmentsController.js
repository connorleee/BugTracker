const pool = require("../db");

module.exports = {
  assignDev: async (req, res) => {
    const { ticketId } = req.params;
    const { devId } = req.body; // If there are multiple users to assign, this will be handled on front end
    const client = await pool.connect();

    try {
      await client.query(
        "INSERT INTO dev_assignments (ticket_id, user_id) VALUES ($1, $2)",
        [ticketId, devId]
      );

      res
        .status(201)
        .json({ msg: `User ${devId} assigned to ${ticketId} succesfully` });
    } catch (err) {
      console.log("assignUsers query error: ", err);
      res
        .status(400)
        .json({ msg: "Please review user project assign creation query" });
    } finally {
      await client.release();
    }
  },

  removeDev: async (req, res) => {
    const { devId } = req.body;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM dev_assignments WHERE id = $1", [devId]);

      res.json(`User removed from ticket`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({ msg: "Unable to remove dev assignment from database" });
    } finally {
      await client.release();
    }
  },
  getAssignedDevs: async (req, res) => {
    const { ticketId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT user_id, first_name, last_name, phone, email FROM users JOIN dev_assignments ON (dev_assignments.user_id = users.id) WHERE ticket_id = $1",
        [ticketId]
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
