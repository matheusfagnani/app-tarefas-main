import { useState } from "react";
import styles from "./TaskItem.module.css";

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  editTask,
  isCompletedList = false,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isCompletedList) return;

    if (isEditing && newText.trim()) {
      editTask(task.id, newText);
    }
    setEditing(!isEditing);
  };

  return (
    <li className={styles.taskItem}>
      {isEditing ? (
        <>
          <input
            className={styles.input}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Salvar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span
            className={task.completed ? styles.completed : ""}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </span>
          {!isCompletedList && (
            <button onClick={handleEdit}>Editar</button>
          )}
          <button onClick={() => deleteTask(task.id)}>Excluir</button>
        </>
      )}
    </li>
  );
}
