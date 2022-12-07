const dbConfig = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.transactions = require("./transaction")(sequelize, DataTypes);

db.users.hasMany(db.transactions);
db.transactions.belongsTo(db.users);

db.sequelize
  .sync({ force: false })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

module.exports = db;
