import { useEffect, useState } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import TimelineForm from "./TimelineForm";
import type { Experience } from "../../types/api";

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getExperiences();

      const sortedData = data.sort((a, b) => {
        return (
          new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
        );
      });

      setExperiences(sortedData);
    } catch (error) {
      console.error("Error loading experiences", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (editingExp) {
        await adminService.updateExperience(editingExp.id, formData);
      } else {
        await adminService.createExperience(formData);
      }
      setShowModal(false);
      setEditingExp(null);
      loadData();
    } catch (error) {
      alert("Error al guardar la experiencia");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta experiencia?")) {
      await adminService.deleteExperience(id);
      loadData();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative pb-10">
      <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white italic">Experience</h2>
          <p className="text-slate-400 text-sm">
            Manage your professional career history
          </p>
        </div>
        <button
          onClick={() => {
            setEditingExp(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          + Add Experience
        </button>
      </header>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-slate-500 animate-pulse">
            Loading experiences...
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-blue-500/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center text-2xl shadow-inner">
                  {exp.logoUrl ? (
                    <img
                      src={exp.logoUrl}
                      alt={exp.empresa}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "💼"
                  )}
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {exp.puesto}
                  </h3>
                  <p className="text-blue-400 font-medium text-sm">
                    {exp.empresa}
                  </p>
                  <p className="text-slate-500 text-xs mt-1 font-mono">
                    {formatDate(exp.fechaInicio)} —{" "}
                    {exp.fechaFin ? formatDate(exp.fechaFin) : "Present"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-5 md:mt-0 w-full md:w-auto">
                <button
                  onClick={() => {
                    setEditingExp(exp);
                    setShowModal(true);
                  }}
                  className="flex-1 md:flex-none px-5 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl text-sm font-bold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 md:flex-none px-5 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-sm font-bold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {!loading && experiences.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 italic">
              No experiences found. Start by adding one!
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <TimelineForm
            type="experience"
            initialData={editingExp}
            onSave={handleSave}
            onCancel={() => {
              setShowModal(false);
              setEditingExp(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExperienceManagement;
