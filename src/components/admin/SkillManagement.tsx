import { useEffect, useState } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import type { Skill } from "../../types/api";

const SkillManagement = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para el formulario de creación rápida
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    nombre: "",
    nivel: "Intermedio",
    categoria: "Frontend",
    iconoUrl: "",
  });

  const loadSkills = async () => {
    try {
      const data = await portfolioService.getSkills();
      setSkills(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.nombre.trim()) return;

    try {
      await adminService.createSkill(newSkill);
      setNewSkill({
        nombre: "",
        nivel: "Intermedio",
        categoria: "Frontend",
        iconoUrl: "",
      });
      loadSkills();
    } catch (error) {
      alert("Error al crear la habilidad");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta habilidad?")) {
      await adminService.deleteSkill(id);
      loadSkills();
    }
  };

  return (
    <div className="space-y-10">
      {/* SECCIÓN DE CREACIÓN (Sin Modal, directo en la página) */}
      <section className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">
          Añadir Nueva Habilidad
        </h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div className="md:col-span-1">
            <label className="text-xs text-slate-400 block mb-1">Nombre</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500"
              value={newSkill.nombre}
              onChange={(e) =>
                setNewSkill({ ...newSkill, nombre: e.target.value })
              }
              placeholder="Ej: React"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Categoría
            </label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none"
              value={newSkill.categoria}
              onChange={(e) =>
                setNewSkill({ ...newSkill, categoria: e.target.value })
              }
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
              <option value="Soft Skills">Soft Skills</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Nivel</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none"
              value={newSkill.nivel}
              onChange={(e) =>
                setNewSkill({ ...newSkill, nivel: e.target.value })
              }
            >
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all"
          >
            Guardar
          </button>
        </form>
      </section>

      {/* LISTADO DE SKILLS */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">
          Habilidades Actuales
        </h2>
        {loading ? (
          <p className="text-slate-500">Cargando...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center group hover:bg-red-500/5 transition-all"
              >
                <div className="overflow-hidden">
                  <p className="text-slate-200 text-sm font-medium truncate">
                    {skill.nombre}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {skill.categoria}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="text-slate-600 hover:text-red-500 transition-colors p-1"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SkillManagement;
