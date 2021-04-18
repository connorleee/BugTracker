const pool = require("../db");

module.exports = {
  createTicket: async (req, res) => {
    const { projectId } = req.params;
    const {
      title,
      description,
      authorId,
      assignedAuthorId,
      priority,
      type,
      status,
      timeEstimate,
    } = req.body;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "INSERT INTO tickets (title, project_id, description, author_id, priority, type, status, time_estimate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          title,
          projectId,
          description,
          authorId,
          priority,
          type,
          status,
          timeEstimate,
        ]
      );

      res.status(201).json({
        msg: `Ticket to ${title} created`,
        ticketId: rows[0].id,
      });
    } catch (err) {
      console.log(`Failed to create ticket for ${title}: `, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      await client.release();
    }
  },
  getProjectTickets: async (req, res) => {
    const { projectId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT tickets.id, tickets.title, tickets.description, users.id AS user_id , users.first_name, users.last_name FROM tickets JOIN users ON tickets.author_id = users.id WHERE project_id = $1",
        [projectId]
      );

      res.json(rows);
    } catch (err) {
      console.log(
        `Failed to get tickets for project ${projectId}: `,
        "\n",
        err
      );
      res.status(500).json({ msg: `Please review query` });
    } finally {
      await client.release();
    }
  },
  updateTicket: async (req, res) => {
    const { ticketId } = req.params;
    const {
      title,
      description,
      authorId,
      assignedAuthorId,
      priority,
      type,
      status,
      timeEstimate,
    } = req.body;
    const client = await pool.connect();

    try {
      await client.query(
        "UPDATE tickets SET (title, description, author_id, assigned_dev_id, priority, type, status, time_estimate) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id = $9",
        [
          title,
          description,
          authorId,
          assignedAuthorId,
          priority,
          type,
          status,
          timeEstimate,
          ticketId,
        ]
      );

      res.status(201).json({ msg: `Ticket ${ticketId} updated successfully` });
    } catch (err) {
      console.log(`Failed to update ticket: `, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      await client.release();
    }
  },
  deleteTicket: async (req, res) => {
    const { ticketId } = req.params;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM tickets WHERE id = $1", [ticketId]);

      res.status(200).json({ msg: `Ticket ${ticketId} deleted` });
    } catch (err) {
      console.log("Failed to delete ticket: ", "\n", err);
      res.status(500).json({ msg: "Review deletion query" });
    } finally {
      client.release();
    }
  },
  getTicket: async (req, res) => {
    const { ticketId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT tickets.id, tickets.title, tickets.description, tickets.priority, tickets.status, tickets.type, tickets.time_estimate, users.first_name, users.last_name FROM tickets JOIN users ON tickets.author_id = users.id WHERE tickets.id = $1",
        [ticketId]
      );

      res.json(rows[0]);
    } catch (err) {
      console.log(`Failed to get ticket for`, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      client.release();
    }
  },
};
