const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(express.json()); // middleware to acces req.body
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
