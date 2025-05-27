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
  filter: FilterValues
  deleteTasks: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTasks: (title:string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean) => void
};

export const TodoListItem = ({
  tasks,
  title,
  filter,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
}: TodoListPropsType) => {
   const [taskTitle, setTaskTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   //Функция обработки button
    const onClickButtonHandler = () => {
      const trimmedTitle = taskTitle.trim()
        if(trimmedTitle !== ''){
          createTasks(trimmedTitle)
          setTaskTitle('')
        }else{
          setError('Title is required')
        }
        
        
    }
    
    //Функция обработки инпут
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    //Функция отправления такси по enter
   const onKeyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            createTasks(taskTitle)
            setTaskTitle('')
        }
   }

  

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input //input
        className={error? 'error': ''}
        value={taskTitle} 
        onChange={onChangeInputHandler} 
        onKeyDown={onKeyDownHandler}/>

        <Button //button
        title={'+'} 
        onClick={onClickButtonHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
           const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue)
            
           }

          const deleteTasksHandler = () => {
            deleteTasks(task.id)
           }
           return(
            <li key={task.id} className={task.isDone ? 'is-done':''}>
              <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
              <span>{task.title}</span>
              <Button title={"X"} onClick={deleteTasksHandler} />
            </li>
         
        )})}
        </ul>
      )}
      <div>
        <Button className={filter === 'all'? "active-filter":'' } title={"All"} onClick={() => changeFilter("all")} />
        <Button className={filter === 'active'? "active-filter":'' } title={"Active"} onClick={() => changeFilter("active")} />
        <Button className={filter === 'completed'? "active-filter":'' } title={"Completed"} onClick={() => changeFilter("completed")} />
      </div>
    </div>
  );
};
