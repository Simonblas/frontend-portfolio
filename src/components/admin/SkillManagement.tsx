import { useEffect, useState } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import type { Skill } from "../../types/api";

const SkillManagement = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    nombre: "",
    nivel: "Intermediate",
    categoria: "Frontend",
    iconoUrl: "",
  });

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error loading skills", error);
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
        nivel: "Intermediate",
        categoria: "Frontend",
        iconoUrl: "",
      });
      loadSkills();
    } catch (error) {
      alert("Error creating skill. Please check your connection.");
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Are you sure? This skill will be removed from all projects where it is linked."
      )
    )
      return;

    try {
      await adminService.deleteSkill(id);
      loadSkills();
    } catch (error: any) {
      console.error("Delete error:", error);

      const status = error.response?.status;

      if (status === 401) {
        alert("Session expired. Please log in again.");
      } else if (status === 500 || status === 409) {
        // Error de MySQL: Violación de integridad referencial
        alert(
          "Cannot delete: This skill is still linked to one or more projects. Remove it from projects first."
        );
      } else {
        alert("An unexpected error occurred while deleting the skill.");
      }
    }
  };

  return (
    <div className="space-y-10 pb-10 px-2">
      {/* ADD SKILL FORM */}
      <section className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6 italic tracking-tight uppercase text-sm text-blue-400">
          Add New Skill
        </h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5 block">
              Name
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-1 ring-blue-500 transition-all text-sm"
              value={newSkill.nombre}
              onChange={(e) =>
                setNewSkill({ ...newSkill, nombre: e.target.value })
              }
              placeholder="e.g. React"
              required
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5 block">
              Category
            </label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-1 ring-blue-500 text-sm"
              value={newSkill.categoria}
              onChange={(e) =>
                setNewSkill({ ...newSkill, categoria: e.target.value })
              }
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5 block">
              Level
            </label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-1 ring-blue-500 text-sm"
              value={newSkill.nivel}
              onChange={(e) =>
                setNewSkill({ ...newSkill, nivel: e.target.value })
              }
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5 block">
              Icon URL
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-1 ring-blue-500 transition-all text-sm"
              value={newSkill.iconoUrl || ""}
              onChange={(e) =>
                setNewSkill({ ...newSkill, iconoUrl: e.target.value })
              }
              placeholder="Cloudinary link..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm"
          >
            Save Skill
          </button>
        </form>
      </section>

      {/* SKILLS LIST */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 italic tracking-tight uppercase text-sm text-blue-400">
          Current Skills
        </h2>
        {loading ? (
          <p className="text-slate-500 animate-pulse">Loading skills...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group hover:border-blue-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-white/5">
                    {skill.iconoUrl ? (
                      <img
                        src={skill.iconoUrl}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span className="text-xs">⚡</span>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-slate-200 text-sm font-bold truncate">
                      {skill.nombre}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-blue-400 font-bold uppercase tracking-tighter">
                        {skill.categoria}
                      </span>
                      <span className="text-[9px] text-slate-500 italic">
                        • {skill.nivel}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="text-slate-600 hover:text-red-500 transition-colors p-2 text-lg"
                  title="Delete skill"
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
