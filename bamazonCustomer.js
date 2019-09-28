// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require("dotenv");
const Table = require("cli-table");

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
  displayProducts();
});

// MySQL Connection END
// =============================================================

// Dotenv START
require('dotenv').config()

const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
// Dotenv END

let displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter the Item ID you would like to buy.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items would you like to buy?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantityNeeded = answers.Quantity;
 	var IDrequested = answers.ID;
 	purchaseOrder(IDrequested, quantityNeeded);
 });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Good news! Your order is in stock!");
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you!");
			
			const updateProduct = `UPDATE products SET stock_quantity = stock_quantity - ${amtNeeded} WHERE item_id = ${ID}`;
			connection.query(updateProduct);
			// connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE item_id = " + ID);
			// Note to self: need to have space before the W in WHERE.
			
		} else{
			console.log("Low Inventory! Choose a different quantity of " + res[0].product_name + " to complete your order.");
		};
		
		displayProducts();
		// connection.end();
	});
};

// Note: Shouldn't have this here because it will run this before connecting to MySQL Server.
// displayProducts(); 