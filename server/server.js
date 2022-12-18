// Importing the express node module:
const express = require('express');
// Using express to create an instance of an app (or server).
const app = express();
const bodyParser = require('body-parser');
// Create a variable whose value is the port address.
const PORT = 5000;
// using the require function to get the router file 
const tasksRouter = require('./routes/tasks.router')

// Teach our server how to read incoming data (req.body):
app.use(bodyParser.urlencoded({extended: true}));

// Tell our server where the static assets live:
app.use(express.static('server/public'));

// connection the server.js file to our router we made for cleaniness 
app.use('/task', tasksRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
