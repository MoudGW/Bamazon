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
   message:'SUPERVISOR OPTION MENU :',
   choices: ['View Product Sales by Department','Create New Department']
 }]).then(function (answers) {
  switch(answers.choise)
  {
   case 'View Product Sales by Department':
   one();
   break;
   case 'Create New Department' :
   two();
   break;
 }  
});
});


function one(){
  var query="SELECT D.department_id,P.department_name,D.over_head_costs,sum(P.product_sales) FROM products AS P,  departments as D WHERE P.department_name =D.department_name GROUP BY D.department_id;"
  con.query(query, function (err, result) {
    if (err) throw err;
    var table = new Table({
      head: ['department_id', 'department_name','over_head_costs','product_sales','total_profit'],
      style: {
        head: ['blue'],
        compact: false,
        colAligns: ['center'],
      }
    });
    for (var i =0; i< result.length; i++) {
     var row=result[i];
     var arr = [];
     for (var prop in row) {
       if(row[prop]===null)
       {
         arr.push(0);
       }else{
         arr.push(row[prop]);
       }
     }
     var total_profit=row.over_head_costs-parseInt(arr[3]);
     table.push([row.department_id,row.department_name,row.over_head_costs,arr[3],total_profit]);
   }
   console.log(table.toString()); 
 });
}
function two(){
 prompt.prompt([{
  name:'name',
  message:'Enter the department_name:'},
  {name:'over_head_costs',
  message:'Enter the over_head_costs:'}]).then(function (answers) {
    var query="INSERT INTO departments (department_name,over_head_costs) values ('"+answers.name+"','"+answers.over_head_costs+"');";
    con.query(query);
    console.log('your department has been added');
  });
}
