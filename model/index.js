const dbConfig = require("../config/db.config.js");
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const Sequelize=require("sequelize")
const sequelize = new Sequelize(
    config.DATABASE_NAME,
    config.DATABASE_USER,
    config.DATABASE_PASSWORD,
    config
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.profile =require("./employees.model.js")(sequelize,Sequelize)
module.exports=db;