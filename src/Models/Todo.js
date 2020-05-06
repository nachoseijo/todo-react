import React from 'react';

export function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.completed ? "line-through" : "" }}
      >
        {todo.body}
  
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      </div>
    );
  }