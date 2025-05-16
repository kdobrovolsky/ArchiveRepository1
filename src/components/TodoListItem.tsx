export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  tasks: Task[];
  title: string;
};

export const TodoListItem = ({ tasks, title }: TodoListPropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />{" "}
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
