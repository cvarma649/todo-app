const express = require("express");
const pg = require("pg");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.post("/todos", async(req,res) => {
    try{
    const {description} =req.body;
    const newTodo = await pool.query( "INSERT INTO mytodos(description) VALUES($1) RETURNING *",[description] );
    res.json(newTodo.rows[0]);}
    catch(err){
        console.error(err.message)
    }
});


app.get("/todos", async(req,res)=> {
    try {
        const allTodos = await pool.query("SELECT * FROM mytodos");       
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM mytodos WHERE id = $1", [id])      
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE mytodos SET description = $1 WHERE id = $2",[description, id]);     
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    };
})


app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const deleteTodo = await pool.query("DELETE FROM mytodos WHERE id = $1", [id]);
        res.json("Todo was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

app.post("login")



app.listen(5000, ()=> console.log("Server on 5000"))