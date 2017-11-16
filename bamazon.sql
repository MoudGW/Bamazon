 Use bamazon;
 ALTER TABLE products
ADD  product_sales int null;
Create table departments(
department_id int not null AUTO_INCREMENT,
department_name varchar(30) not null,
over_head_costs int null,
primary key (department_id)
);
INSERT INTO products (product_name,department_name,Price,stock_quantity)
values
('iphoneX','technologie',999.99,100),('snapple','bevarage',0.99,10000),
('samaung','technologie',799.99,50),('Twiz','food',1.99,20040),
('smartwater','bevarage',4.99,10000),('kraft','food',9.99,4000),
('Oil','Auto',99.99,50600),('Tiers','Auto',99.99,0),
('headphones','technologie',39.99,10440),('coca-cola','bevarage',2.99,100000);