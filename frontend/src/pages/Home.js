import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import api from "../services/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      filterPriority === "All" || t.priority === filterPriority;
    const matchesCompleted = showCompleted || !t.completed;
    return matchesSearch && matchesPriority && matchesCompleted;
  });

  return (
    <div>
      {/* Form Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Create New Task
        </h2>
        <TaskForm
          onSubmit={async (payload) => {
            await api.post("/tasks", payload);
            fetchTasks();
          }}
          editing={editing}
          onUpdate={async (id, payload) => {
            await api.put(`/tasks/${id}`, payload);
            setEditing(null);
            fetchTasks();
          }}
          onCancel={() => setEditing(null)}
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-40 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          <span>Show Completed</span>
        </label>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Your Tasks
        </h2>

        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No tasks found.</div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onEdit={() => setEditing(t)}
                onDelete={async () => {
                  await api.delete(`/tasks/${t.id}`);
                  fetchTasks();
                }}
                onToggleComplete={async () => {
                  await api.put(`/tasks/${t.id}`, {
                    completed: !t.completed,
                  });
                  fetchTasks();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
