import React, { useState, useEffect } from "react";
import type { TaskType } from "../types";
import AddTask from "./AddTask";

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

const initialTaskList: TaskType[] = [
    {
        id: "1",
        title: "Task 1",
        description: "Description for Task 1",
        status: "pending",
        assignedTo: "User A",
    },
    {
        id: "2",
        title: "Task 2",
        description: "Description for Task 2",
        status: "done",
        assignedTo: "User B",
    },
    {
        id: "3",
        title: "Task 3",
        description: "Description for Task 3",
        status: "done",
        assignedTo: "User A",
    },
];

const TaskList: React.FC = () => {
    const [taskList, setTaskList] = useState<TaskType[]>(initialTaskList);
    const [addTaskToggle, setAddTaskToggle] = useState(false);
    const [statusFilter, setStatusFilter] = useState<
        "all" | "pending" | "done"
    >("all");
    const [users, setUsers] = useState<User[]>([]);

    // Fetch users once
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://dummyjson.com/users");
                const data = await res.json();
                setUsers(data.users);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleAddTask = (newTask: Omit<TaskType, "id">) => {
        const task: TaskType = { ...newTask, id: Date.now().toString() };
        setTaskList((prev) => [...prev, task]);
        setAddTaskToggle(false);
    };

    const handleStatusToggle = (id: string) => {
        setTaskList((prev) =>
            prev.map((t) =>
                t.id === id
                    ? {
                          ...t,
                          status: t.status === "pending" ? "done" : "pending",
                      }
                    : t
            )
        );
    };

    const displayedTasks = taskList.filter((t) =>
        statusFilter === "all" ? true : t.status === statusFilter
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Task List
                    </h2>
                    <button
                        onClick={() => setAddTaskToggle((v) => !v)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        {addTaskToggle ? "Cancel" : "Add Task"}
                    </button>
                </div>

                {addTaskToggle && (
                    <AddTask users={users} onAddTask={handleAddTask} />
                )}

                {/* Filter */}
                <div className="mb-6 flex items-center space-x-2">
                    <label
                        htmlFor="statusFilter"
                        className="font-medium text-gray-700 dark:text-gray-200"
                    >
                        Show:
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                {/* Task Items */}
                <ul className="space-y-4">
                    {displayedTasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {task.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {task.description}
                                </p>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                                    Assigned to:{" "}
                                    <span className="font-medium">
                                        {task.assignedTo}
                                    </span>
                                </p>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                                        task.status === "done"
                                            ? "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
                                    }`}
                                >
                                    {task.status.charAt(0).toUpperCase() +
                                        task.status.slice(1)}
                                </span>
                            </div>
                            <button
                                onClick={() => handleStatusToggle(task.id)}
                                className="self-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 border-2 rounded-b-m border-blue-600 dark:border-blue-400 text-sm p-2"
                            >
                                Toggle Status
                            </button>
                        </li>
                    ))}

                    {displayedTasks.length === 0 && (
                        <li className="text-center text-gray-500 dark:text-gray-400">
                            No tasks to show.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
