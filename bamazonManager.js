var mysql=require('mysql');
var prompt=require('inquirer');
var Table=require('cli-table');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
}); 


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
prompt.prompt([{
  	name:'choise',
  	type: 'list',
	message:'MANAGER OPTION MENU:',
	choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
    }]).then(function (answers) {
    switch(answers.choise)
    {
    	case 'View Products for Sale' :
         one();
    	break;
    	case 'View Low Inventory' :
        four();
    	break;
    	case 'Add to Inventory' :
    	two();
    	break;
    	case 'Add New Product' :
        three();
    	break;
    }  
	});
});

function one(){
	         con.query("select * from products", function (err, result) {
    if (err) throw err;
       var table = new Table({
		head: ['item_id', 'product_name','Price','stock_quantity' ],
		style: {
			head: ['blue'],
			compact: false,
			colAligns: ['center'],
		}
	});
    for (var i =0; i< result.length; i++) {
    	 var row=result[i];
         table.push([row.item_id,row.product_name,row.Price,row.stock_quantity]);
    }
      console.log(table.toString()); 
     });
}
function two(){
	prompt.prompt([{
  	name:'ID',
	message:'Enter the ID of the product you like to add more :'},
    {name:'quantity',
	message:'Enter the quantity:'}]).then(function (answers) {
	con.query("select * from products where item_id="+answers.ID, function (err, result) {
	var x=parseInt(result[0].stock_quantity)+parseInt(answers.quantity);
   con.query("UPDATE products SET stock_quantity="+x+" WHERE item_id="+answers.ID, function (err, result) {
    con.query("select * from products where item_id="+answers.ID, function (err, result) {
    if (err) throw err;
       var table = new Table({
		head: ['item_id', 'product_name','Price','stock_quantity' ],
		style: {
			head: ['blue'],
			compact: false,
			colAligns: ['center'],
		}
	  });
       for (var i =0; i< result.length; i++) 
     {
    	 var row=result[i];
         table.push([row.item_id,row.product_name,row.Price,row.stock_quantity]);
     }
      console.log(table.toString()); 
     });
   });
    });
	
     
	 });
}
function three()
{
	prompt.prompt([{
  	name:'name',message:'Enter the Product name:'},
    {name:'dep',message:'Enter the Departement:'}, 
	{name:'price',message:'Enter the Price:'}, 
	{name:'quantity',message:'Enter the Quantity:'}]).then(function (answers) {
     var Query="INSERT INTO products (product_name,department_name,Price,stock_quantity) values ('"+answers.name+"','"+answers.dep+"',"+parseFloat(answers.price)+','+parseInt(answers.quantity)+")";
    con.query(Query);
    one();
	});
}
function four()
{
	    	con.query("select * from products where stock_quantity<5 ", function (err, result) {
    if (err) throw err;
       var table = new Table({
		head: ['item_id', 'product_name','Price','stock_quantity' ],
		style: {
			head: ['blue'],
			compact: false,
			colAligns: ['center'],
		}
	});
    for (var i =0; i< result.length; i++) {
    	 var row=result[i];
         table.push([row.item_id,row.product_name,row.Price,row.stock_quantity]);
     }
      console.log(table.toString()); 
     });
}