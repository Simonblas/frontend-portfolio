import { useState, useEffect } from "react";

interface FormState {
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
  logoUrl: string | null;
  institucion?: string;
  empresa?: string;
  titulo?: string;
  puesto?: string;
  tipo?: string;
  [key: string]: any;
}

interface Props {
  type: "experience" | "education";
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const TimelineForm = ({ type, initialData, onSave, onCancel }: Props) => {
  const isEdu = type === "education";

  const [formData, setFormData] = useState<FormState>({
    descripcion: initialData?.descripcion || "",
    fechaInicio: initialData?.fechaInicio || "",
    fechaFin: initialData?.fechaFin || "",
    logoUrl: initialData?.logoUrl || "",
    [isEdu ? "institucion" : "empresa"]:
      initialData?.[isEdu ? "institucion" : "empresa"] || "",
    [isEdu ? "titulo" : "puesto"]:
      initialData?.[isEdu ? "titulo" : "puesto"] || "",
    ...(isEdu && { tipo: initialData?.tipo || "Degree / University" }),
  });

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpieza profunda de datos para el Backend
    const dataToSend = {
        ...formData,
        // Convertir strings vacíos a null para que Spring Boot no falle
        fechaFin: !formData.fechaFin || formData.fechaFin.trim() === "" ? null : formData.fechaFin,
        logoUrl: !formData.logoUrl || formData.logoUrl.trim() === "" ? null : formData.logoUrl,
    };
    
    onSave(dataToSend);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/85 backdrop-blur-sm p-0 md:p-4"
      onMouseDown={onCancel}
    >
      <div 
        className="bg-slate-900 border-t md:border border-white/10 p-6 md:p-8 rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white italic tracking-tight">
              {initialData ? "Edit" : "Add"}{" "}
              {isEdu ? "Education" : "Experience"}
            </h2>
            <button 
              onClick={onCancel} 
              className="text-slate-500 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Empresa / Institución */}
            <div className="md:col-span-2">
              <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">
                {isEdu ? "Institution" : "Company"}
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:ring-1 ring-blue-500 transition-all text-base md:text-sm"
                value={formData[isEdu ? "institucion" : "empresa"] || ""}
                onChange={(e) => setFormData({ ...formData, [isEdu ? "institucion" : "empresa"]: e.target.value })}
                required
              />
            </div>

            {/* Título / Puesto */}
            <div className={isEdu ? "md:col-span-1" : "md:col-span-2"}>
              <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">
                {isEdu ? "Degree / Title" : "Position"}
              </label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:ring-1 ring-blue-500 transition-all text-base md:text-sm"
                value={formData[isEdu ? "titulo" : "puesto"] || ""}
                onChange={(e) => setFormData({ ...formData, [isEdu ? "titulo" : "puesto"]: e.target.value })}
                required
              />
            </div>

            {/* Tipo (Solo Educación) */}
            {isEdu && (
              <div>
                <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">Type</label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none appearance-none focus:ring-1 ring-blue-500 text-base md:text-sm"
                  value={formData.tipo || ""}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                >
                  <option value="Degree / University">Degree / University</option>
                  <option value="Course / Certification">Course / Certification</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            )}

            {/* Logo URL */}
            <div className="md:col-span-2">
              <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">Logo URL (Cloudinary)</label>
              <input
                placeholder="https://res.cloudinary.com/..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:ring-1 ring-blue-500 text-base md:text-sm"
                value={formData.logoUrl || ""}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              />
            </div>

            {/* Fechas */}
            <div>
              <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">Start Date</label>
              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:ring-1 ring-blue-500 text-base md:text-sm"
                value={formData.fechaInicio || ""}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">
                End Date (Empty = Present)
              </label>
              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:ring-1 ring-blue-500 text-base md:text-sm"
                value={formData.fechaFin || ""}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-blue-400 uppercase font-bold tracking-widest mb-1.5 block">Description</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white h-28 resize-none outline-none focus:ring-1 ring-blue-500 leading-relaxed text-base md:text-sm"
              placeholder="Briefly describe your responsibilities or achievements..."
              value={formData.descripcion || ""}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-6 border-t border-white/5 mt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white py-4 px-12 rounded-2xl font-bold order-1 md:order-2 transition-all active:scale-95 shadow-lg shadow-blue-600/25 text-base md:text-sm"
            >
              {initialData ? "Save Changes" : "Add Entry"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full md:w-auto text-slate-400 hover:text-white py-4 px-8 order-2 md:order-1 transition-colors text-base md:text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelineForm;