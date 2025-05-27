import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";
import { v1 } from "uuid";

export type FilterValues = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValues>("all");

  //Удаление тасок
  const deleteTasks = (taskId: string) => {
    let deleteTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteTask);
  };

  //Фильтрация тасок
   let filteredTask = tasks;
  (filter === "active"? filteredTask = tasks.filter((t) => t.isDone !== false):''); 
  (filter === "completed"? filteredTask = tasks.filter((t) => t.isDone == false):'') 
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  //Создание таски
  const createTasks = (title:string) => {
    const newTask = { id: v1(), title: title, isDone: false }
    const newTasks = [ newTask,...tasks]
    setTasks(newTasks)
   
  }

  const changeTaskStatus =(taskId: string, isDone: boolean) => {
    const task = tasks.find(t => t.id === taskId)
    if(task){
      task.isDone = isDone
      setTasks([...tasks])
    }
  }

  return (
    <div className="app">
      <TodoListItem
        tasks={filteredTask}
        title={"TodoList"}
        deleteTasks={deleteTasks}
        changeFilter={changeFilter}
        createTasks={createTasks}
        changeTaskStatus={changeTaskStatus} 
        filter={filter}      />
    </div>
  );
}

export default App;
