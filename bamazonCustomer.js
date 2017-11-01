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
  con.query("select * from products", function (err, result) {
    if (err) throw err;
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
   one();
  });
});
function one(){
   prompt.prompt([{
  	name:'ID',
	message:'Enter the ID of the product you like to buy :'},
    {name:'quantity',
	message:'Enter the quantity of the product you like to buy :'}]).then(function (answers) {
     con.query("select stock_quantity,Price from products where item_id="+answers.ID, function (err, result) {
    if (err) throw err;
       var x=parseInt(result[0].stock_quantity)-parseInt(answers.quantity);
       if(x<0)
       {
       	console.log('Insufficient quantity!');
       }
       else{
         con.query( "UPDATE products SET stock_quantity="+x+" WHERE item_id="+answers.ID);
         console.log('your Total invoice is :'+parseInt(answers.quantity)*result[0].Price+"$"+"\nThank you for your Purchase");
       }
  });

});
}
