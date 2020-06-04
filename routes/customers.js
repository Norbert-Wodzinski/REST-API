const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const pool = mysql.createPool(
    {
      connectionLimit: 100,
      host: "localhost",
      user: "username",
      password: "password",
      database: 'db'
    })
  

function getConnection() 
{
    return pool
}


//GET request to find user by ID. Reused to delete user by ID 
router.get('/customers/:id', (req, res) => 
{  
    
    const con = getConnection()
    const userID = req.params.id
    const querySelect = "SELECT * FROM customers WHERE id = ?"
    

    console.log("Fetching user with id : " + req.params.id)
    con.query(querySelect, [userID], (err, rows ) =>
    {
        if(err)
        {
            console.log("Failed to retrieve customer" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Customer fetched")
        res.json(rows)
    })
   })



 //GET request allowing the display of all customers
router.get("/customers", (req, res) => 
{
    
    const con = getConnection()
    
    const selectQuery = "SELECT * FROM customers" 
    con.query(selectQuery, (err, result, rows, column, fields) => 
    {
        if(err) 
        {
            console.log("cannot display from table" + err)
            res.sendStatus(500)
            return
        } 
        res.json(result)
        
        })
   
    })



    /*To use this request we ssimply type in   localhost:PORTNUMBER/home.html  (our case the port number is set to 5000) as this allows us to use a basic html template to insert the data*/
    router.post('/add_customer', (req, res) =>
    {
        const cust_name = req.body.customer_Name
        const cust_adress = req.body.customer_Adress
        
        var queryString = "INSERT INTO customers (name, adress) VALUES (?, ?)"
      
         getConnection().query(queryString, [cust_name, cust_adress], (err, result, fields) =>
         {
          if(err) 
          {
              console.log("Error adding new customer" + err)
              res.sendStatus(500)
              return
          }
              console.log("New customer added to the database")
              res.end()
          })
      });
      


    // Put request used upon wanting to reset the value of the id primary key 
    router.put('/customers', (req, res) => 
    {
        
    const queryUpdate = "ALTER TABLE customers AUTO_INCREMENT = 1"
    getConnection().query(queryUpdate, (err,result,fields) =>
    {
        if(err)
        {
            console.log("Error updating customer " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.send("Customer ID auto increment reset to 1" )

    })
       
    })

               
    

   //Delete request tested and working via POSTMAN 
        router.delete('/customers/:id', (req, res) =>
        {
            const deleteByID = req.params.id
            const queryDelete = "DELETE FROM customers WHERE id = ?";
        
        getConnection().query(queryDelete, [deleteByID], (err, result, fields) => 
        {
            if(err) 
            {
                console.log("Error deleting customer " + err)
                res.sendStatus(500)
                res.end()
                return
            }
                 res.send("Customer deleted from the database");
                 
        })
        });
    
       

module.exports = router