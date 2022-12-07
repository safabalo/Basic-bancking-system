const usersController = require("../controllers/users");

const express = require("express");
const app = express.Router();

app.get("/allCustomers", usersController.getAllUsers);
app.get("/customer/:id", usersController.getOneUser);
app.post("/customer/:id", usersController.sendTransfer);

module.exports = app;
