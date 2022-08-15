const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");

const PORT = process.env.PORT || 3001;
require("dotenv").config();
const cors = require("cors");
console.log(process.env.PORT)
app.use(express.json()); // middleware to acces req.body
app.use(express.urlencoded({ extended: false }));
//middleware to handle any CORS issues
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  if (req.method === "options") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});
const pool = require("./db")
pool
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
