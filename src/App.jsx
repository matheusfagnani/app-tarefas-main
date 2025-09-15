import { useState, useEffect } from "react";
import Header from "./components/Header/index";
import Relogio from "./components/Clock/index";
import TaskInput from "./components/TaskInput/index";
import TaskList from "./components/TaskList";
import styles from "./App.module.css";

function App() {
  // Estado inicial vindo do localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Salvar sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Adicionar tarefa
  const addTask = (text) => {
    if (!text.trim()) return; // evita adicionar vazio
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  };

  // Editar tarefa
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Alternar tarefa concluída
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Excluir tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.app}>
      <Header />
      <Relogio />

      <TaskInput addTask={addTask} />

      <h2>Pendentes</h2>
      <TaskList
        tasks={tasks.filter((t) => !t.completed)}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        isCompletedList={false}
      />

      <h2>Concluídas</h2>
      <TaskList
        tasks={tasks.filter((t) => t.completed)}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        isCompletedList={true}
      />
    </div>
  );
}

export default App;
