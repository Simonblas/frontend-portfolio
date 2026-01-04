/**
 * Basado en la entidad Education.java
 */
export interface Education {
  id: number;
  institucion: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string; // LocalDate llega como string (YYYY-MM-DD)
  fechaFin: string | null;
  logoUrl: string | null;
  tipo: string;
}

/**
 * Basado en la entidad Experience.java
 */
export interface Experience {
  id: number;
  empresa: string;
  puesto: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
  logoUrl: string | null;
}

/**
 * Basado en la entidad Skill.java
 */
export interface Skill {
  id: number;
  nombre: string;
  nivel: string;
  categoria: string;
  iconoUrl: string | null;
}

/**
 * Basado en la entidad Project.java
 */
export interface Project {
  id: number;
  titulo: string;
  descripcion: string;
  urlDemo: string | null;
  urlRepo: string | null;
  imageUrl: string | null;
  fecha: string;
  skills: Skill[];
}

/**
 * Basado en la entidad User.java
 * Nota: No incluimos username/password por seguridad,
 * solo lo necesario para el perfil público.
 */
export interface UserProfile {
  id: number;
  nombre: string;
  apellido: string;
  titulo: string;
  emailContacto: string;
  sobreMi: string;
  fotoUrl: string | null;
  ubicacion: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  curriculumPdfUrl: string | null;
}

/**
 * DTO para la relación Muchos a Muchos entre Proyecto y Skills
 */
export interface ProjectSkillRequest {
  projectId: number;
  skillIds: number[]; // Usamos array de números para el Set de Java
}
