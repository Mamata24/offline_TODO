import React, { useState } from 'react'
import TodoList from './TodoList'
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert'
function TodoInput() {
    const [todo, setTodo] = useState({ title: "", done: false, tag: [] })
    const [tag,setTag]  = useState("")
    const [todoArray, setTodoArray] = useState([])
    const [list, setList] = useState([])
    let todos = localStorage.hasOwnProperty("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    
    const onChange = (e) => {
        let { value } = e.target
        let obj = {}
        obj["title"] = value
        obj["done"] = false
        setTodo(obj)
    }

    const createTodo = (e) => {
        const { name } = e.target
        if (e.key === "Enter" || name === "addTodo") {
            if (todo.title !== "") {
                todo.tag = tag
                todos.unshift(todo)
                setTodoArray(todos)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodo({ title: "", done: false })
            }
            else {
                alert("Add Task to perform")
            }
        }
    }
 
    const completeTodo = (i) => {
        if (todos[i]["done"] !== true) {
            todos[i]["done"] = true
            localStorage.setItem("todos", JSON.stringify(todos))
            setTodoArray(todos)
                setList(todos)

            alert("Task Completed")
        }
    }
    const deleteTodo = (i) => {
        Swal({
            title: "Are You sure?",
            text: "Once deleted, won't get back",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(res => {
            if (res) {
                todos=[]
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodoArray(todos)
                setList(todos)
            }
        })
    }
    const activeTodo = () => {
        const b = todos.filter(todo => todo["done"] === false);
        setList(b)
    }

    const handleAll = () => {
        setList(todoArray)
    }

    const handleCompleted = () => {
        const b = todos.filter(todo => todo["done"] === true);
        setList(b)
    }

    

    const handleTag = (e) => {
        const b = todos.filter(todo => todo["tag"] === e.target.textContent) 
        setList(b)
    }

    const handleTextarea = (e) => {
        setTag(e.target.value)
    }

    
    
    return (
        <>
            <div style={{ width: '100%' }}>
            <h1 style={{ margin: "20px" }}>TODO
            <button style={{float:"right"}} className="btn-deleteTodo delete" type="button" name="deleteTodo" onClick={deleteTodo}>Reset</button> 
            </h1>
            <Box borderRadius="10px" component="div" display="inline" p={1} m={1} bgcolor="background.paper">
            <input type="text" name="todo" placeholder="Add task" value={todo.title} onKeyPress={createTodo} onChange={onChange} />
             <input type="text" className="textArea" cols="20" rows="0" onChange={handleTextarea} value={tag} placeholder="use space to separate tags"/>  
            <button className="btn-addTodo add" type="button" name="addTodo" onClick={createTodo}>Add</button>
            </Box>
            </div>
            <br></br>
            <br></br>
            <div>
                <button className="btn-all all" type="button" onClick={handleAll}>All</button>
                <button className="btn-active active" type="button" name="activeTodo" onClick={activeTodo}>Active</button>
                <button className="btn-complete completed" type="button" name="completeTodo" onClick={handleCompleted} >Completed</button>
            </div>
            <div>
                <div className="tag" onClick={handleTag}>
                    {list.map(item => <span>{item.tag}</span>)}
                </div>
            </div>
            <TodoList todoArray={list} completeTodo={completeTodo} />
        </>
    )
}

export default TodoInput
