export interface Project {
    id: string;
    name: string;
    description: string;
    status: "Planning" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    progress: number; // percentage of completion
    dueDate: string; // ISO date string
    createdAt: string; // ISO date string
}