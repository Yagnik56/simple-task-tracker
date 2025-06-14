import React from "react";
import type { TaskType } from "../types";

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

interface AddTaskProps {
    users: User[];
    onAddTask: (task: Omit<TaskType, "id">) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ users, onAddTask }) => {
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        assignedTo: "",
        status: "pending" as "pending" | "done",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selected = users.find(
            (u) => u.id.toString() === formData.assignedTo
        );
        onAddTask({
            ...formData,
            assignedTo: selected
                ? `${selected.firstName} ${selected.lastName}`
                : "",
        });
        setFormData({
            title: "",
            description: "",
            assignedTo: "",
            status: "pending",
        });
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Add Task
                </h2>

                {/* Title */}
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter task title"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter task description"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Assigned To */}
                <div className="flex flex-col">
                    <label
                        htmlFor="assignedTo"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Assigned To
                    </label>
                    <select
                        id="assignedTo"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a user</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.firstName} {u.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                    <label
                        htmlFor="status"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
