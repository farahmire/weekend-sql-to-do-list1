const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const pool = require('..//server/modules/pool');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES //

//GET 
app.get('/task', (req, res) => {
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
        console.log('error getting koalas', dbErr);
        res.sendStatus(500);
      });
  });


// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});