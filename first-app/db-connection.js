var mysql= require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpassword",

  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("use users");
  });

  
/*

const Sequelize =require("sequalize");
const sequelize= new Sequelize("socialnetwork", "root", "", 
{host:"localhost", dialect: "mysql", operatorsAliases: false});

module.exports= sequelize;
global.sequelize=sequelize;
*/

module.exports=con;