import './App.css';
import React from "react";
import {Fragment} from "react";
import Input from "./input";
import List from "./list";
import {useState} from "react";

function App(nt) {
  const [todos, setTodos]= useState([])
  const allTodos = [...todos,nt]
  const saveTodo=()=>{
    setTodos(allTodos)
  }
  const deleteTodo =async(id)=>{
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`,{
        method: "DELETE"
      })
      setTodos(todos.filter((_,id)=> todos.id !==id))
    } catch (err) {
      console.error(err.message)
    }}

return (
    <Fragment>
    <div className="App">
      <h1 className="mt-5">Todos</h1>
      <Input saveTodo={saveTodo}/>
      <List allTodos={allTodos} deleteTodo={deleteTodo}/>
    </div>
    </Fragment>
  );
}

export default App;
