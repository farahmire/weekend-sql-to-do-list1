// Importing the pg library (this is what helps us connect to our database!)
const pg = require('pg');

const config = {
  database: 'TaskList', // the name of database, This can change!
  host: 'localhost',  // where is your database?
  port: 5432, // the port for your database, 5432 is default for postgres
  max: 10, // how many connections (queries) at one time
  idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
};

const pool = new pg.Pool(config);

//this is how node can handle arbitrary events
pool.on("connect", () => {
  console.log("connected to postgres");
});

// the pool with emit an error on behalf of any idle clients
// it contains if a back end error or network partition happens
pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

// Exporting the pool file 
module.exports = pool;