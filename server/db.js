const {Pool} = require("pg");

const pool = new Pool({
    user : "postgres",
    password: 0707,
    host: "localhost",
    port: 5432,
    database: "todos",
});


module.exports = pool;
