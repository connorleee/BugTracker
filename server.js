const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(express.json()); // middleware to acces req.body
app.use(express.urlencoded({ extended: false }));
//middleware to handle any CORS issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "options") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
