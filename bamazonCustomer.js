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
 // display all available items
 con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from products", function (err, result) {
    if (err) throw err;
    // to draw a table for the query result
       var table = new Table({
		head: ['item_id', 'product_name', 'department_name','Price','stock_quantity' ],
		style: {
			head: ['blue'],
			compact: false,
			colAligns: ['center'],
		}
	});
    for (var i =0; i< result.length; i++) {
    	 var row=result[i];
         table.push([row.item_id,row.product_name,row.department_name,row.Price,row.stock_quantity]);
    }
   console.log(table.toString()); 
   // call function one
   one();
  });
});
// define function one
function one(){
  // prompt a Q/A 
   prompt.prompt([{
  	name:'ID',
	message:'Enter the ID of the product you like to buy :'},
    {name:'quantity',
	message:'Enter the quantity of the product you like to buy :'}]).then(function (answers) {
    // select the te item with this specific ID
     con.query("select stock_quantity,Price,department_name from products where item_id="+answers.ID, function (err, result) {
    if (err) throw err;
    // take out the quantity bought from the stock 
       var product_sales=parseInt(answers.quantity)*result[0].Price;
       var x=parseInt(result[0].stock_quantity)-parseInt(answers.quantity);
       // if x<0 throw this message
       if(x<0)
       {
       	console.log('Insufficient quantity!');
       }
       // else update the table and diplay this invoice
       else{
         con.query( "UPDATE products SET stock_quantity="+x+","+"product_sales="+product_sales+" WHERE item_id="+answers.ID);
         console.log('your Total invoice is :'+product_sales+"$"+"\nThank you for your Purchase");
       }
  });

});
}
