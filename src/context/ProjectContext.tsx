import { createContext, useContext, useEffect, useState } from "react";

import type { Project } from "../types/project";
import { useAuth } from "./AuthContext";

interface ProjectContextType {
  projects: Project[];

  addProject: (project: Project) => void;

  updateProject: (project: Project) => void;

  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  /*
   * Load projects for the currently logged-in user.
   */
  const [projects, setProjects] = useState<Project[]>(() => {
    return [];
  });

  
  function getProjectKey() {
    if (!user?.email) {
      return null;
    }

    return `projects_${user.email.toLowerCase().trim()}`;
  }

  useEffect(() => {
    const projectKey = getProjectKey();

    
    if (!projectKey) {
      setProjects([]);
      return;
    }

    const savedProjects = localStorage.getItem(projectKey);

    /*
     * User has no projects yet.
     */
    if (!savedProjects) {
      setProjects([]);
      return;
    }

    try {
      const parsedProjects: Project[] = JSON.parse(savedProjects);

      setProjects(parsedProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);

      setProjects([]);
    }
  }, [user]);

  /*
   * Save projects to localStorage.
   */
  function saveProjects(updatedProjects: Project[]) {
    const projectKey = getProjectKey();

    if (!projectKey) {
      return;
    }

    setProjects(updatedProjects);

    localStorage.setItem(projectKey, JSON.stringify(updatedProjects));
  }

  /*
   * Add a new project.
   */
  function addProject(project: Project) {
    const updatedProjects = [...projects, project];

    saveProjects(updatedProjects);
  }

  /*
   * Update an existing project.
   */
  function updateProject(project: Project) {
    const updatedProjects = projects.map((existingProject) =>
      existingProject.id === project.id ? project : existingProject,
    );

    saveProjects(updatedProjects);
  }

  /*
   * Delete a project.
   */
  function deleteProject(id: string) {
    const updatedProjects = projects.filter((project) => project.id !== id);

    saveProjects(updatedProjects);
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

/*
 * Custom hook for accessing project data.
 */
export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used inside ProjectProvider");
  }

  return context;
}
