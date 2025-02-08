import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./Components/AddTodo";
import NoTasksView from "./Components/NoTasksView";
import TasksView from "./Components/TasksView";
import { getAllTasks } from "./Store/ApiCalls";


function App() {
  const [todoList, setTodoList]=useState([]);

  useEffect(()=> {

    const fetchTasks=async()=> {
      const data=await getAllTasks();
      setTodoList(data)
    }
    fetchTasks();
    
  }, [])

  return (
    
    <div className="flex flex-row">
      {
        todoList ? 
          (todoList.length===0 ? <NoTasksView/> : <TasksView tasks={todoList}/>) : <p>asdf</p>
      }
      <AddTodo tasks={todoList}/>
    </div>
  );
}

export default App;
