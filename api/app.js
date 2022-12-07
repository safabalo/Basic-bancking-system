const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const router = require("./router/users");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT);
