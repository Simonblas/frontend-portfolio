import { useEffect, useState } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import type { Project, Skill } from "../../types/api";
import ProjectForm from "./ProjectForm";

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]); // Necesitamos las skills para el formulario
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const loadData = async () => {
    const [projData, skillData] = await Promise.all([
      portfolioService.getProjects(),
      portfolioService.getSkills(),
    ]);
    setProjects(projData);
    setSkills(skillData);
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleSave = async (formData: any) => {
    try {
      let savedProject: Project;

      const { skillIds, ...projectBasicData } = formData;

      if (editingProject) {
        savedProject = await adminService.updateProject(
          editingProject.id,
          projectBasicData
        );
      } else {
        savedProject = await adminService.createProject(projectBasicData);
      }

      if (skillIds && skillIds.length > 0 && savedProject.id) {
        const skillRequest = {
          projectId: savedProject.id,
          skillIds: skillIds,
        };

        // Llamamos al endpoint /api/projects/add-skills
        await adminService.assignSkillsToProject(skillRequest);
      }

      setShowModal(false);
      loadData(); // Recargamos para ver el proyecto con sus skills vinculadas
    } catch (error) {
      console.error("Error in the saving process:", error);
      alert("There was a problem saving the project or your skills.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this project?")) {
      await adminService.deleteProject(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white">Your projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="bg-blue-600 max-sm:text-sm max-sm:px-1 max-sm:ml-4 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all"
          >
            <div className="h-40 bg-slate-800 relative">
              {proj.imageUrl && (
                <img
                  src={proj.imageUrl}
                  alt={proj.titulo}
                  className="w-full h-full object-cover opacity-60"
                />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setShowModal(true);
                  }}
                  className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-500"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">{proj.titulo}</h3>
              <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                {proj.descripcion}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {proj.skills?.map((s) => (
                  <span
                    key={s.id}
                    className="text-[10px] bg-white/10 text-slate-300 px-2 py-1 rounded-md"
                  >
                    {s.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ProjectForm
          project={editingProject}
          availableSkills={skills}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Componentes internos pequeños para iconos
const EditIcon = () => <span>✎</span>;
const TrashIcon = () => <span>✕</span>;

export default ProjectManagement;
