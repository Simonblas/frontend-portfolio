import { useState, useEffect } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import TimelineForm from "./TimelineForm";
import type { Education } from "../../types/api";

const EducationManagement = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getEducation();
      
      // ORDEN CRONOLÓGICO: Del más reciente al más antiguo
      const sortedData = data.sort((a, b) => {
        return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
      });
      
      setEducations(sortedData);
    } catch (error) {
      console.error("Error loading education data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (editingEdu) {
        await adminService.updateEducation(editingEdu.id, formData);
      } else {
        await adminService.createEducation(formData);
      }
      setShowModal(false);
      setEditingEdu(null);
      loadData();
    } catch (error) {
      alert("Error saving education record");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this academic record?")) {
      await adminService.deleteEducation(id);
      loadData();
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white italic tracking-tight">Education</h2>
          <p className="text-slate-400 text-sm">Degrees, courses, and certifications</p>
        </div>
        <button
          onClick={() => {
            setEditingEdu(null);
            setShowModal(true);
          }}
          className="bg-blue-600 max-sm:text-sm max-sm:px-3 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          + Add Education
        </button>
      </div>

      {/* EDUCATION LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-10 text-slate-500 animate-pulse font-medium">
            Loading academic history...
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between group hover:border-blue-500/30 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  {/* LOGO ADAPTATIVO */}
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/5 overflow-hidden shadow-inner">
                    {edu.logoUrl ? (
                      <img src={edu.logoUrl} alt={edu.institucion} className="w-full h-full object-cover" />
                    ) : (
                      "🎓"
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">
                      {edu.tipo || "Degree"}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 leading-tight">{edu.titulo}</h3>
                    <p className="text-slate-400 text-sm font-medium">{edu.institucion}</p>
                    <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-tighter">
                      {edu.fechaInicio.split("-")[0]} — {edu.fechaFin ? edu.fechaFin.split("-")[0] : "Present"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 pt-4 border-t border-white/5 mt-auto">
                <button
                  onClick={() => {
                    setEditingEdu(edu);
                    setShowModal(true);
                  }}
                  className="flex-1 py-2 text-blue-400 bg-blue-400/5 hover:bg-blue-400/10 rounded-lg text-sm font-bold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="flex-1 py-2 text-red-400 bg-red-400/5 hover:bg-red-400/10 rounded-lg text-sm font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {!loading && educations.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 italic">No academic records found.</p>
          </div>
        )}
      </div>

      {/* MODAL INVOCATION */}
      {showModal && (
        <TimelineForm
          type="education"
          initialData={editingEdu}
          onSave={handleSave}
          onCancel={() => {
            setShowModal(false);
            setEditingEdu(null);
          }}
        />
      )}
    </div>
  );
};

export default EducationManagement;