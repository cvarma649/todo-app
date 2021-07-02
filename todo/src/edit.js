import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";


const Edit=({todo, triggerTodos })=>{
    const [description, setDescription] = useState(todo.description)
    const [isOpen, setIsOpen] = useState(false)
    const handleShow =()=> setIsOpen(true)
    const handleClose = ()=> setIsOpen(false)

 
    const editTodo=async()=>{
        if (description.length > 0){
        try {
            const body = {description}
            const res = await fetch(`http://localhost:5000/todos/${todo.id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
          setDescription(description)
            triggerTodos()
            console.log(description)
        } catch (err) {
            console.error(err.message)
        }}  }         

        const handleClick=(e)=>{
             e.preventDefault()
            if(todo.description !== description && description.length >0){
                editTodo(todo.id);
            }      
            handleClose()
        }

    return(
        <div>
            <button className="btn btn-warning" onClick={handleShow}>Edit</button>
            <Modal show={isOpen} onHide={handleClose} keyboard={false} centered size="lg" key={todo.id} > 
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="yolo" onSubmit={handleClick}>
                        <input type="text"  className="form-control"  value={description.length > 0 ? description: todo.description} onChange={e=>setDescription(e.target.value)}/>
                    </form>
                    </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning" form="yolo" onClick={handleClick} type="submit">Edit</button>
                    <button className="btn btn-primary" onClick={handleClose} type="button">Close</button>
                    </Modal.Footer>
           </Modal> 
        </div>
    )
}

export default Edit;