import { useState } from "react";
import type { Project, Skill } from "../../types/api";

interface Props {
  project?: Project | null;
  availableSkills: Skill[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, availableSkills, onSave, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    titulo: project?.titulo || "",
    descripcion: project?.descripcion || "",
    urlRepo: project?.urlRepo || "",
    urlDemo: project?.urlDemo || "",
    imageUrl: project?.imageUrl || "",
    fecha: project?.fecha || new Date().toISOString().split("T")[0],
    skillIds: project?.skills?.map((s) => s.id) || ([] as number[]),
  });

  const toggleSkill = (skillId: number) => {
    const current = [...formData.skillIds];
    const index = current.indexOf(skillId);
    if (index > -1) current.splice(index, 1);
    else current.push(skillId);
    setFormData({ ...formData, skillIds: current });
  };

  return (
    // Fondo oscuro que cubre toda la pantalla
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
      onMouseDown={onCancel}
    >
      {/* Contenedor del Modal */}
      <div className="bg-slate-900 border border-white/10 p-6 md:p-10 rounded-3xl w-full max-w-4xl shadow-2xl my-auto" onMouseDown={(e) => e.stopPropagation()}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          {project ? "Editar" : "Crear"} Proyecto
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* COLUMNA 1: Datos básicos */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Título
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Descripción
              </label>
              <textarea
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white h-32 md:h-48 resize-none focus:border-blue-500 outline-none transition-all"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Fecha del proyecto
              </label>
              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* COLUMNA 2: Enlaces y Skills */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                URL GitHub
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                value={formData.urlRepo}
                onChange={(e) =>
                  setFormData({ ...formData, urlRepo: e.target.value })
                }
                placeholder="https://github.com/tu-repo"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                URL Live Demo
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                value={formData.urlDemo}
                onChange={(e) =>
                  setFormData({ ...formData, urlDemo: e.target.value })
                }
                placeholder="https://tu-proyecto.com"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                URL Imagen (Cloudinary)
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Tecnologías Usadas
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 bg-slate-800 border border-slate-700 rounded-xl shadow-inner">
                {availableSkills.map((skill) => (
                  <label
                    key={skill.id}
                    className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skillIds.includes(skill.id)}
                      onChange={() => toggleSkill(skill.id)}
                      className="accent-blue-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {skill.nombre}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 mt-4 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="order-2 sm:order-1 text-slate-400 font-medium px-6 py-3 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="order-1 sm:order-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95"
            >
              Guardar Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
