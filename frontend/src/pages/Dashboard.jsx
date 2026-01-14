import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(true);

  // 🔹 Filters & Search
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  // 🔒 Protect dashboard
  useEffect(() => {
    if (!loading && !token) {
      navigate("/");
    }
  }, [loading, token, navigate]);

  // 📥 Fetch tasks
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  // ➕ Add task
  const addTask = async () => {
    if (!form.title) return;
    await API.post("/tasks", form);
    setForm({
      title: "",
      category: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });
    fetchTasks();
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // 🔁 Toggle status
  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "Completed" ? "Pending" : "Completed",
    });
    fetchTasks();
  };

  // 📊 STATISTICS
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter(
    (t) => t.status !== "Completed"
  ).length;

  // 📂 Unique categories
  const categories = [
    "All",
    ...new Set(tasks.map((t) => t.category).filter(Boolean)),
  ];

  // 🎯 Apply filters + search
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "All" || task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;

    const categoryMatch =
      categoryFilter === "All" || task.category === categoryFilter;

    const searchMatch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      statusMatch &&
      priorityMatch &&
      categoryMatch &&
      searchMatch
    );
  });

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Task Management
          </h1>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>

        {/* 📊 STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-slate-500 text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-indigo-600">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-slate-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-slate-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>
        </div>

        {/* 🔍 FILTERS + SEARCH */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat || "Uncategorized"}
              </option>
            ))}
          </select>
        </div>

        {/* ➕ ADD TASK */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold text-slate-800 mb-3">
            Add New Task
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <button
              onClick={addTask}
              className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
              + Add
            </button>
          </div>
        </div>

        {/* 📋 TASK LIST */}
        {filteredTasks.length === 0 ? (
          <p className="text-center text-slate-500">
            No tasks found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition border-l-4 border-indigo-500"
              >
                <h3 className="font-semibold text-slate-800">
                  {task.title}
                </h3>

                <p className="text-sm text-slate-500">
                  Category:{" "}
                  <span className="font-medium">
                    {task.category || "General"}
                  </span>
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No date"}
                </p>

                <div className="flex gap-2 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full
                    ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full
                    ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => toggleStatus(task)}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    {task.status === "Completed"
                      ? "Mark Pending"
                      : "Complete"}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}






