// import our required packages for this APP
var mysql=require('mysql');
var prompt=require('inquirer');
var Table=require('cli-table');
// establish a connection with the database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
}); 

// connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // prompt a list of choise
prompt.prompt([{
  	name:'choise',
  	type: 'list',
	message:'MANAGER OPTION MENU:',
	choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
    }]).then(function (answers) {
    switch(answers.choise)
    {
      // depend on the user input one of the four functions will be triggered
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
	  // select all items and diplay them in a graphic table     
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
  // will ask the user to fill the data for inputs
	prompt.prompt([{
  	name:'ID',
	message:'Enter the ID of the product you like to add more :'},
    {name:'quantity',
	message:'Enter the quantity:'}]).then(function (answers) {
    // return the item with specific ID 
	con.query("select * from products where item_id="+answers.ID, function (err, result) {
    // add the quantity to the previous one
	var x=parseInt(result[0].stock_quantity)+parseInt(answers.quantity);
  // update column stock
   con.query("UPDATE products SET stock_quantity="+x+" WHERE item_id="+answers.ID, function (err, result) {
    // diplay the new result 
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
   // will ask the user to fill the data for inputs
	prompt.prompt([{
  	name:'name',message:'Enter the Product name:'},
    {name:'dep',message:'Enter the Departement:'}, 
	{name:'price',message:'Enter the Price:'}, 
	{name:'quantity',message:'Enter the Quantity:'}]).then(function (answers) {
    // insert a new row in the table
     var Query="INSERT INTO products (product_name,department_name,Price,stock_quantity) values ('"+answers.name+"','"+answers.dep+"',"+parseFloat(answers.price)+','+parseInt(answers.quantity)+")";
    con.query(Query);
    // diplay all the result
    one();
	});
}
function four()
{
  // select item with stock below 5
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
     // display the result in a table
      console.log(table.toString()); 
     });
}