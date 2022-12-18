const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


//GET 
tasksRouter.get('/', (req, res) => {
    console.log('in task GET');
    let sqlQuery = `
      SELECT * FROM "list" 
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
      .then((dbRes) => {
      // sends back array of koala objects
      console.log("Database response",dbRes)
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('error getting tasks', dbErr);
        res.sendStatus(500);
      });
  });

//POST
tasksRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Post request is ${newTask.task}`)
    console.log('adding tasks',req.body);

    let sqlQuery = `
    INSERT INTO "list" 
    ("task")
    VALUES ($1);
    `
    let sqlValues = [newTask.task];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Error adding new task', dbErr);
        res.sendStatus(500);
    })
})

tasksRouter.delete('/:id', (req,res)=> {
    console.log(req.params);
    let idToDelete = req.params.id;
  
    let sqlQuery =`
    DELETE FROM "list"
    WHERE "id" =$1;`
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues) /// [req.params.id] another way
        .then((dbRes) => {
            ///that worked send the okay to client
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log('broke in DELETE /id:1')
            res.sendStatus(500);
        })
    });


    module.exports = tasksRouter;