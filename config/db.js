const { Sequelize } = require("sequelize");

require('dotenv').config({path:'./variables.env'});



const db = new Sequelize('kataldoc_umbrellasis', 'kataldoc_umbrellasis', 'LbG[CLDSFRr8', {
    host: '192.154.227.209',
    dialect: "mysql",
    port: 3306,
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