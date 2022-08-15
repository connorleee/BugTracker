const Pool = require("pg").Pool;
require("dotenv").config();
const process = require("process")
const devConfig = {
  user: process.env.PGUSER || "pgrootuser",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "bugtracker",
  password: process.env.PGPASSWORD || "password",
  port: process.env.PGPORT || 5432,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
// console.log(process.env)
module.exports = pool;
