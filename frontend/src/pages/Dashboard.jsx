import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;

    await createTask({ title });
    setTitle("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await updateTask(task._id, {  status: !task.status });
    fetchTasks();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Your Tasks</h1>

      {/* Add Task */}
      <div className="flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No tasks yet. Add one 🚀
        </p>
      )}

      {/* Task Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <p
                className={`font-medium ${
                  task.status? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.status
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {task.status ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleStatus(task)}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg"
              >
                Toggle
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
