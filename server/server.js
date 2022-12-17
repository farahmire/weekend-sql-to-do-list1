const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const pool = require('..//server/modules/pool');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static('server/public'));

// ROUTES //

//GET 
app.get('/getTask', (req, res) => {
    console.log('in task GET');
    let sqlQuery = `
      SELECT * FROM "tasks" 
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
      .then((dbRes) => {
      // sends back array of koala objects
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('error getting tasks', dbErr);
        res.sendStatus(500);
      });
  });

//POST
app.post('/postTask', (req, res) => {
    
    console.log('adding tasks',req.body );

    let sqlQuery = `
    INSERT INTO "tasks" 
    ("task", "mark_complete")
    VALUES ($1, $2);
    `
    let sqlValues = [req.body.task, req.body.markcomplete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Error adding new task', dbErr);
        res.sendStatus(500);
    })
})




// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});