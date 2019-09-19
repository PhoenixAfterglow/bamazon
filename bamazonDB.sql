DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BEBONCOOL RF 2.4GHz Wireless Presenter Remote Presentation USB Control Clicker", "Electronics", 14.99, 1148), 
       ("DJI Mavic Pro", "Electronics", 850, 18),
       ("GoPro Hero 7 Black", "Electronics", 220, 233),
       ("Pelican Case for DJI Mavic Pro", "Storage", 49.99, 120), 
       ("SONGMICS Folding Storage Ottoman (Brown)", "Storage", 23.99, 492), 
       ("HBlife 100 ft Expandable Garden Water Hose with 8 Spray Pattern Nozzle", "Home & Garden", 34.99, 0), 
       ("CO-Z Automatic Sliding Gate Opener Hardware Sliding Driveway Security Kit", "Home & Garden", 188.88, 5), 
       ("CURAD Basic Care Vinyl Disposable Exam Gloves, Large (Pack of 300)", "Cleaning Supplies", 15.99, 807),  
       ("Avery 2x4 Shipping Address Labels (100 Labels)", "Office Supplies", 4.44, 18676), 
       ("Pentel GraphGear 500 Automatic Drafting Pencil Black (PG525A)", "Office Supplies", 4.95, 15337);