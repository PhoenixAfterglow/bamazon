// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require("inquirer");

// MySQL Connection START
// =============================================================
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Phxrising20!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

// MySQL Connection END
// =============================================================

