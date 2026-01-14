import Badge from "./Badge";

function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{task.title}</h3>

      <div className="flex gap-2 my-2">
        <Badge text={task.priority} />
        <Badge text={task.status} />
      </div>

      <p className="text-sm text-gray-600">
        Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No date"}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onToggle}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Toggle
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
