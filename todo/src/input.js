import React from "react";
import {useState} from "react";


const Input = ({saveTodo}) =>{
    const [description, setDescription] = useState("")

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        if (description.length > 0){
        try {
            const body = {description}
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            })
            saveTodo(description);
        } catch (err) {
            console.error(err.message)
        }
    }}
    
    return(
        <div>
           <form className="form-group mt-5 justify-content-center d-flex" onSubmit={onSubmitForm}>
               <input type="text" className="form-control mt-3 w-50 mr-2" value={description} onChange={(e)=>setDescription(e.target.value)} />
                <button className="btn btn-success mt-3 ">Add</button>
           </form> 
        </div>
    )
}

export default Input;