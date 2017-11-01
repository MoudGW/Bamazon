Create database bamazon;
 Use bamazon;
Create table products(
item_id int not null AUTO_INCREMENT,
product_name varchar(30) not null,
department_name varchar(30) not null,
Price double not null,
stock_quantity int null,
primary key (item_id)
);
INSERT INTO products (product_name,department_name,Price,stock_quantity)
values
('iphoneX','technologie',999.99,100),('snapple','bevarage',0.99,10000),
('samaung','technologie',799.99,50),('Twiz','food',1.99,20040),
('smartwater','bevarage',4.99,10000),('kraft','food',9.99,4000),
('Oil','Auto',99.99,50600),('Tiers','Auto',99.99,0),
('headphones','technologie',39.99,10440),('coca-cola','bevarage',2.99,100000);