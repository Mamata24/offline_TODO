import { Card } from '@material-ui/core'
import React from 'react'


export default function TodoList(props) {
    const { completeTodo} = props
    let todoArray = props.todoArray.length > 0 ? props.todoArray : JSON.parse(localStorage.getItem('todos'))
    return (
        <div className="todo-list">
            <ul>
                {todoArray && todoArray.length > 0 ? todoArray.map((ele, i) => (
                    <li key={i}>
                        <Card title="Complete" onClick={() => completeTodo(i)} className={`fas fa-check-circle pointer done ${ele["done"] ? "green" : "blue"}`} className={ele["done"] ? "line-through" : null}><h2>{ele.title}</h2>  <p>{ele.tag}</p></Card>
                    </li>
                )) : null
                }
            </ul>
        </div>
    )
}