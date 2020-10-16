/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

function TodoList(){
  const [todos, setTodos] = useState('');

  const updateTodos = () => {
    axios.get('/todos').then(response => {
      if(response.data.length > 0){
        setTodos(response.data);
      } else {
        setTodos('');
      }
    }).catch(err => {
      console.log('err: ',err);
    })
  }

  useEffect(() => {
    updateTodos();
  }, []);

  return(
    <div className="todo">
      <h1 id='head'>To do:</h1>
      {todos.length < 1 ? <h3>No Todos to display, Please add some</h3> : todos && todos.map(todo => (
        <Todo key={todo._id} todo={todo} updateTodos={updateTodos} completed={todo.complete}/>
      ))}
      <AddTodo setTodos={setTodos} updateTodos={updateTodos}/>
    </div>
  )
}

function Todo(props){
  const todo = props.todo;

  const complete = () => {
    axios.patch(`/complete/${todo._id}`).then(result => {
      if(result.status === 200){
        props.updateTodos();
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const deleteTodo = () => {
    axios.delete(`/todo/${todo._id}`).then(result => {
      if(result.status === 200){
        props.updateTodos();
      }
    }).catch(err => {
      console.log(err);
    })
  }

  if(props.completed){
    return(
      <div className='todoElement completed'>
        <span>{todo.text}</span>
        <div className='buttons'>       
          <button id='completeBtn' onClick={complete}> √ </button>     
          <button id='deleteBtn' onClick={deleteTodo}> X </button>
      </div>
     </div>
    )
  }else{
    return(
      <div className='todoElement'>
        <span>{todo.text}</span>
        <div className='buttons'>       
          <button id='completeBtn' onClick={complete}> √ </button>     
          <button id='deleteBtn' onClick={deleteTodo}> X </button>
      </div>
     </div>
    )
  }
}

function AddTodo(props){
  const [todo, setTodo] = useState('');

  const onChange = (e) => {
    setTodo(e.target.value);
  }

  const add = () => {
      axios.post('/todo', {
      text : todo
    }).then(result => {
      if(result.status === 201){
        props.updateTodos();
        console.log(result);
        setTodo('');
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return(
    <div className='addTodo'>
      <div id='AddInput'>
        <h4>Task: </h4>
        <input className='input' type='text' onChange={onChange} value={todo} placeholder='What Do You Need To Do ?'/>
      </div>
      <button id='addBtn' onClick={add} disabled={todo.length < 1}>Save Item</button>
    </div>
  )
}

export default App;
