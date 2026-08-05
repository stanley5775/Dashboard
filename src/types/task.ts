export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  assignedUserId: number;
  assignedUser: string;
  dueDate: string;
  status: "Todo" | "In Progress" | "Completed";
  createdAt: string;
}
