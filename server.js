require("./config/config");
const express = require("express");
const DbCon = require("./config/dbCon");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

DbCon();

// required middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello from the server side!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
