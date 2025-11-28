import React, { useEffect, useState } from "react";

const blank = {
  title: "",
  description: "",
  priority: "Medium",
  category: "",
  deadline: "",
};

export default function TaskForm({
  onSubmit,
  editing,
  onUpdate,
  onCancel,
}) {
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        deadline: editing.deadline
          ? new Date(editing.deadline).toISOString().slice(0, 16)
          : "",
      });
    } else {
      setForm(blank);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      deadline: form.deadline
        ? new Date(form.deadline).toISOString()
        : undefined,
    };

    if (editing) onUpdate(editing.id, payload);
    else onSubmit(payload);

    if (!editing) setForm(blank);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow mb-4 border dark:border-gray-600"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          className="col-span-2 p-2 border rounded dark:bg-gray-600 dark:text-gray-200"
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-600 dark:text-gray-200"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Category */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 border rounded col-span-1 md:col-span-3 dark:bg-gray-600 dark:text-gray-200"
        />

        {/* Deadline */}
        <input
          type="datetime-local"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="p-2 border rounded col-span-1 md:col-span-3 dark:bg-gray-600 dark:text-gray-200"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded col-span-1 md:col-span-3 dark:bg-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Buttons */}
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {editing ? "Update Task" : "Add Task"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 transition dark:bg-gray-500 dark:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
