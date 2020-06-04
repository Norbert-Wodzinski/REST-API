var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password",
    database: "db"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("A connection has been established");
    
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), adress VARCHAR(255))";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("Table altered created");
    });
    
    
});