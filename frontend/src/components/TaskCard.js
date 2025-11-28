import React from "react";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const badgeColor =
    task.priority === "High"
      ? "bg-red-500"
      : task.priority === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div
      className={`
        p-4 rounded-lg shadow-md border
        bg-gray-50 dark:bg-gray-800 dark:border-gray-700
        transition 
        ${task.completed ? "opacity-60 line-through" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggleComplete}
            className="mt-1 w-5 h-5 accent-green-600"
          />

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {task.title}
              </h3>

              <span
                className={`px-2 py-1 text-xs text-white rounded ${badgeColor}`}
              >
                {task.priority}
              </span>
            </div>

            {task.category && (
              <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {task.category}
              </p>
            )}

            {task.description && (
              <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
