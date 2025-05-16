import { ChangeEvent,useState } from "react";
import { FilterValues } from "../App";
import { Button } from "./Button";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  tasks: Task[];
  title: string;
  deleteTasks: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTasks: (title:string) => void
};

export const TodoListItem = ({
  tasks,
  title,
  deleteTasks,
  changeFilter,
  createTasks,
}: TodoListPropsType) => {
   const [taskTitle, setTaskTitle] = useState('')

   //Функция обработки button
    const onClickButtonHandler = () => {
        if(taskTitle === ''){
            return
        }
        createTasks(taskTitle)
        setTaskTitle('')
        
    }
    
    //Функция обработки инпут
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

   const onKeyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            createTasks(taskTitle)
        }
   }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input //input
        value={taskTitle} 
        onChange={onChangeInputHandler} 
        onKeyDown={onKeyDownHandler}/>

        <Button //button
        title={'+'} 
        onClick={onClickButtonHandler}/>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
           const deleteTasksHandler = () => {
            deleteTasks(task.id)
           }
           return(
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={"X"} onClick={deleteTasksHandler} />
            </li>
         
        )})}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => changeFilter("all")} />
        <Button title={"Active"} onClick={() => changeFilter("active")} />
        <Button title={"Completed"} onClick={() => changeFilter("completed")} />
      </div>
    </div>
  );
};
