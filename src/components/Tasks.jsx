import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

//Função para renderiazar a lista de tarefas e atualizar o status de conclusão
function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?title=${task.title}&description=${task.description}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded md">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 w-full flex items-center gap-2 text-white p-2 rounded-md text-left ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.isCompleted && <CheckIcon />}
            {task.title}
          </button>
          <Button
            onClick={() => onSeeDetailsClick(task)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <ChevronRightIcon />
          </Button>
          <Button
            onClick={() => props.onDeleteTaskClick(task.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
