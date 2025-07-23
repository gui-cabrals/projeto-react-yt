import AddTask from "./components/AddTask.jsx";
import Tasks from "./components/Tasks.jsx";
import { useEffect, useState } from "react";
import Title from "./components/Title.jsx";

//Armazenamento do state tasks
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  ); // Armazenando as tarefas adicionadas pelo "localStorage" no nosso "State"

  // Usando o localStorage para armazenar a atualização das tarefas || Primeiro parâmetro é o nome para identificar o dado armazenado, segundo parâmetro é o que eu quero armazenar no localStorage (no caso, no parâmetro que nós nomeamos "tasks".)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Função para atualizar o status de conclusão das tarefas
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // PRECISO RETORNAR A TAREFA SEM ALTERAÇÕES
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w- screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
