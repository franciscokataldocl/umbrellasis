const { Sequelize } = require("sequelize");

require('dotenv').config({path:'./variables.env'});



const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: "mysql",
    port: process.env.BD_PORT,
    define:{
        timestamps:false
    },
    operatorAliases:false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:1000
    }
  });

  module.exports = db;

//   mysql -u root -p
//   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot';
//   FLUSH PRIVILEGES;