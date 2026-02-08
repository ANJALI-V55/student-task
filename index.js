const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Student Task Manager is running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});