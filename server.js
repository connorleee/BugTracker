const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

app.get("/api", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
