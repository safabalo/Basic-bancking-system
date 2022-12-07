module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define("transfers", {
    amount: {
      type: DataTypes.FLOAT,
    },
    sender: {
      type: DataTypes.INTEGER,
    },
    receiver: {
      type: DataTypes.INTEGER,
    },
  });
  return transactions;
};
