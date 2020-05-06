import React, { useState, useEffect } from 'react';
import { ApiRequest } from '../Utils/Api';
import { Todo } from '../Models/Todo';
import { TodoForm } from '../Forms/Form';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { body: "Task 1", completed: false },
    { body: "Task 2", completed: false },
    { body: "Task 3", completed: false }
  ]);

  useEffect(() => {
    //Fetchs data onstart
    async function fetchData() {
      const result = await ApiRequest({ method: 'get', resource: 'todo', updateFunction: setTodos });
      if (result)
        setTodos(result);
    }
    fetchData();
  }, []);

  const addTodo = async (body) => {
    const data = { body: body, completed: false };
    const todo = await ApiRequest({ method: 'post', resource: 'todo', data: data });
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const completeTodo = async (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    const data = { body: todo.body, completed: !todo.completed };
    const result = await ApiRequest({ method: 'patch', resource: 'todo', id: todo.id, data: data });
    if (result)
      newTodos[index].completed = !todo.completed;
    setTodos(newTodos);
  };

  const removeTodo = async (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    console.log(todo);
    const queryResult = await ApiRequest({ method: 'delete', resource: 'todo', id: todo.id });
    if (queryResult)
      newTodos.splice(index, 1)
    setTodos(newTodos);
  };

  // we'll render our todos here ...
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
