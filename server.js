const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const cors = require("cors");

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

app.use(routes);

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
