const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hey.");
});

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
