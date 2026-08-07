#Project Management Dashboard

A responsive project management dashboard built with React, TypeScript, Tailwind CSS, and React Router. The application allows users to manage projects and tasks, organize tasks with a Kanban board, and monitor progress through an analytics dashboard.

#Features

- #User authentication and protected routes
- #Create, edit, and delete projects
- #Create, edit, and delete tasks
- #Search and filter tasks
- #Kanban board with drag-and-drop
- #Analytics dashboard
- #Responsive design for desktop and mobile
- #Nested and dynamic routing
- #Persistent application state

#Technologies

- React
- TypeScript
- Tailwind CSS
- React Router
- Context API
- Lucide React
- Axios
- Vite


#Challenges & Solutions

React Router & 404 Errors

I initially had issues with dashboard routes returning a 404 after login. I solved this by restructuring my nested routes, protected routes, and "Outlet" usage.

Mobile Responsiveness

The Task page initially broke on smaller screens. I improved it using Tailwind's responsive utilities, adjusting flex layouts, widths, spacing, and overflow behavior.

Kanban Drag & Drop

I encountered issues while implementing drag-and-drop. I solved them by properly structuring the "DragDropContext", droppable columns, and draggable tasks, then updating the task status when a task was moved.

Shared State

As the application grew, passing project data between components became difficult. I introduced "ProjectContext" to provide shared project state across the application and make the analytics dashboard easier to implement.

TypeScript & Component Errors

I also encountered import/export and TypeScript errors during development. Debugging these helped me better understand typed props, custom types, module exports, and component structure.

#What I Learned

This project helped me strengthen my understanding of:

- React component architecture
- React Router and protected routes
- Context API and shared state
- TypeScript
- Responsive Tailwind CSS
- CRUD operations
- Drag-and-drop interfaces
- Debugging and problem solving
- Git branching and meaningful commits

#Getting Started

git clone [repository-url]
cd [project-folder]
npm install
npm run dev


 #Author

Stanley Ibekwe

Frontend Developer