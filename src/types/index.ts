export interface TaskType {
    id: string;
    title: string;
    description: string;
    status: "pending" | "done";
    assignedTo: string;
}
