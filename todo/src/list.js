import React from "react"
import {useState, useEffect} from "react";
import Edit from "./edit";

const List=({deleteTodo, allTodos})=>{
    const [todos, setTodos] = useState([])
    
    const getTodos = async()=>{
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jData = await response.json()
            setTodos(jData)
        } catch (err) {
           console.error(err.message) 
    }}

    
       
    useEffect(
            ()=>{getTodos()},[allTodos]
    )
            console.log(todos)
    return(
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                   {todos.map( todo => (
                    <tr key={todo.id}>
                    <td> {todo.description}</td>
                    <td><Edit todo={todo} triggerTodos={getTodos} /></td>
                    <td><button className="btn btn-danger" type="button" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                </tr>
                  ))}
                </tbody>
            </table>
        </div>
    )
}

export default List;