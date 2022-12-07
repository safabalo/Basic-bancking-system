const db = require("../models");
const sequelize = require("sequelize");
const Users = db.users;
const Transfer = db.transactions;

const getAllUsers = async (req, res) => {
  let users = await Users.findAll({});
  res.send(users);
};

const getOneUser = async (req, res) => {
  let id = req.params.id;
  let user = await Users.findOne({ where: { id: id } });
  res.send(user);
};

const sendTransfer = async (req, res) => {
  let id = req.params.id; //get user Id from URL
  let senderId = parseInt(id); //parsing the Id from string
  const { amount, receiverId } = req.body;
  let user = await Users.findOne({ where: { id: senderId } });
  let receiver = await Users.findOne({ where: { id: receiverId } });
  let transact = await Transfer.create({
    amount: amount,
    sender: senderId,
    receiver: receiverId,
  });
  let senderBalance = (user.balance - amount).toFixed(3);
  user.balance = senderBalance;
  let receivedBalance = (receiver.balance + amount).toFixed(3);
  receiver.balance = receivedBalance;

  await user.save();
  await receiver.save();
  const result = { user, receiver, transact };

  res.send(result);
};

module.exports = {
  getAllUsers,
  getOneUser,
  sendTransfer,
};
