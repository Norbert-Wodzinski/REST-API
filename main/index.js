const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 5000;
const bodyParser = require('body-parser')
const router = require('../routes/customers.js')


app.use(express.static('../public'))
app.use(bodyParser.urlencoded({extended: false}))



app.use(router)



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
