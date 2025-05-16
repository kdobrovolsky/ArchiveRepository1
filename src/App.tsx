import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]) 

  let [filter, setFilter] = useState<FilterValues>('all')

  //Удаление тасок
  const deleteTasks = (taskId:number) => {
   let deleteTask = tasks.filter(task => task.id !== taskId)
   setTasks(deleteTask)
  }

  let filteredTask = tasks
  if(filter === 'active'){
    filteredTask = tasks.filter(t => t.isDone !== false)
  }
  if(filter === 'completed'){
    filteredTask = tasks.filter(t => t.isDone !== true)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  return (
    <div className="app">
      <TodoListItem
       tasks={filteredTask} 
       title={"TodoList"} 
       deleteTasks={deleteTasks}
       changeFilter={changeFilter}
       />
       
    </div>
  );
}

export default App;
