const pool = require("../db");

module.exports = {
  createComment: async (req, res) => {
    const { ticketId } = req.params;
    const { authorId, comment } = req.body;
    const client = await pool.connect();

    try {
      await client.query(
        "INSERT INTO comments (author_id, ticket_id, comment) VALUES ($1, $2, $3)",
        [authorId, ticketId, comment]
      );

      res.status(201).json({ msg: `Comment on ticket${ticketId} created` });
    } catch (err) {
      console.log(`Failed to create message for ${ticketId}: `, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      await client.release();
    }
  },
  getTicketComments: async (req, res) => {
    const { ticketId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT comments.id, comments.ticket_id, comments.comment, comments.created_at, users.id AS author_id, users.first_name, users.last_name FROM comments JOIN users ON comments.author_id = users.id WHERE ticket_id = $1",
        [ticketId]
      );

      res.json(rows);
    } catch (err) {
      console.log(`Failed to get ticket for`, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      client.release();
    }
  },
  updateComment: async (req, res) => {
    const { ticketId, commentId } = req.params;
    const { authorId, comment } = req.body;
    const client = await pool.connect();

    try {
      await client.query(
        "UPDATE comments SET (author_id, comment) = ($1, $2) WHERE id = $3",
        [authorId, comment, commentId]
      );

      res
        .status(201)
        .json({ msg: `Comment ${commentId} updated successfully` });
    } catch (err) {
      console.log(`Failed to update comment: `, "\n", err);
      res.status(500).json({ msg: `Please review query` });
    } finally {
      await client.release();
    }
  },
  deleteComment: async (req, res) => {
    const { ticketId, commentId } = req.params;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM comments WHERE id = $1", [commentId]);

      res.status(200).json({ msg: `Comment ${commentId} deleted` });
    } catch (err) {
      console.log("Failed to delete comment: ", "\n", err);
      res.status(500).json({ msg: "Review deletion query" });
    } finally {
      client.release();
    }
  },
};
