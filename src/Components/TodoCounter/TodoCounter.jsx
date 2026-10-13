import './TodoCounter.css';
export default function TodoCounter({ totalTodos, completedTodos }) {
  return (
    <h2 className="TodoCounter">
      Has completado {completedTodos} de {totalTodos} Tareas
    </h2>
  );
}