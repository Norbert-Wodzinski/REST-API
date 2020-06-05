Usage node index.js

To use POST request http://localhost:5000/home.html is needed to enter the name and address example data into db 
To use GET request  http://localhost:5000/customers is needed, it displays all  current users in db
Both DELETE and PUT requests sent through postman.

DELETE requires http://localhost:5000/customers/id where id in the url represents the id of the record/customer desired for deletion from the db.

PUT request uses same url as GET request, this example is only used to reset the auto increment of the id as it resets it back to 0.

Tested in postman
