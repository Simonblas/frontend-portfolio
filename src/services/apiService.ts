import axiosClient from "../api/axiosClient";
import type {
  Project,
  Skill,
  Experience,
  Education,
  UserProfile,
  ProjectSkillRequest,
} from "../types/api";
import type { LoginResponse } from "../types/auth";

/**
 * SERVICIOS DE AUTENTICACIÓN
 */
export const authService = {
  // POST /api/auth/login
  login: async (credentials: LoginCredentials) => {
    const { data } = await axiosClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return data;
  },
};
export interface LoginCredentials {
  username: string;
  password: string;
}
/**
 * SERVICIOS PÚBLICOS (Lectura - GET)
 * Accesibles para cualquier visitante del portfolio.
 */
export const portfolioService = {
  // GET /api/user (Trae el perfil del admin)
  getProfile: async () => {
    const { data } = await axiosClient.get<UserProfile>("/user");
    return data;
  },

  // GET /api/projects
  getProjects: async () => {
    const { data } = await axiosClient.get<Project[]>("/projects");
    return data;
  },

  // GET /api/skills
  getSkills: async () => {
    const { data } = await axiosClient.get<Skill[]>("/skills");
    return data;
  },

  // GET /api/experience
  getExperiences: async () => {
    const { data } = await axiosClient.get<Experience[]>("/experience");
    return data;
  },

  // GET /api/education
  getEducation: async () => {
    const { data } = await axiosClient.get<Education[]>("/education");
    return data;
  },
};

/**
 * SERVICIOS DE ADMINISTRACIÓN (Escritura - POST, PUT, DELETE)
 * Requieren Token JWT (manejado automáticamente por axiosClient).
 */
export const adminService = {
  // --- USER PROFILE ---
  updateProfile: async (profile: UserProfile) => {
    const { data } = await axiosClient.put<UserProfile>("/user", profile);
    return data;
  },

  // --- PROJECTS ---
  createProject: async (project: Omit<Project, "id" | "skills">) => {
    const { data } = await axiosClient.post<Project>("/projects", project);
    return data;
  },
  updateProject: async (id: number, project: Project) => {
    const { data } = await axiosClient.put<Project>(`/projects/${id}`, project);
    return data;
  },
  deleteProject: async (id: number) => {
    await axiosClient.delete(`/projects/${id}`);
  },
  // Relación Muchos a Muchos (M-a-M)
  addSkillsToProject: async (payload: ProjectSkillRequest) => {
    const { data } = await axiosClient.post<Project>(
      "/projects/add-skills",
      payload
    );
    return data;
  },
  // En tu apiService.ts dentro del objeto adminService
  assignSkillsToProject: (data: ProjectSkillRequest) =>
    axiosClient.post("/projects/add-skills", data),
  // --- SKILLS ---
  createSkill: async (skill: Omit<Skill, "id">) => {
    const { data } = await axiosClient.post<Skill>("/skills", skill);
    return data;
  },
  deleteSkill: async (id: number) => {
    await axiosClient.delete(`/skills/${id}`);
  },

  // --- EXPERIENCE ---
  createExperience: async (exp: Omit<Experience, "id">) => {
    const { data } = await axiosClient.post<Experience>("/experience", exp);
    return data;
  },
  updateExperience: async (id: number, exp: Experience) => {
    const { data } = await axiosClient.put<Experience>(
      `/experience/${id}`,
      exp
    );
    return data;
  },
  deleteExperience: async (id: number) => {
    await axiosClient.delete(`/experience/${id}`);
  },

  // --- EDUCATION ---
  createEducation: async (edu: Omit<Education, "id">) => {
    const { data } = await axiosClient.post<Education>("/education", edu);
    return data;
  },
  updateEducation: async (id: number, edu: Education) => {
    const { data } = await axiosClient.put<Education>(`/education/${id}`, edu);
    return data;
  },
  deleteEducation: async (id: number) => {
    await axiosClient.delete(`/education/${id}`);
  },
};
