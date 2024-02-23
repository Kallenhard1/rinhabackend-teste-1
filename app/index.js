const express = require("express");
const app = express();
const routes = require("./routes/router.js");
const db = require("../db/database.js");
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM pg_stat_activity;");
    res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: err.message });
  }
});

app.use(routes);

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
