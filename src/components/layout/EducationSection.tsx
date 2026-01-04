import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";

const EducationSection = () => {
  const { data: education, request: fetchEdu } = useApi(
    portfolioService.getEducation
  );

  useEffect(() => {
    fetchEdu();
  }, [fetchEdu]);

  return (
    <section
      id="education"
      className="py-20 px-6 max-w-4xl mx-auto border-b-1 border-b-gray-500/50"
    >
      <h2 className="text-3xl font-bold mb-12 text-center w-fit mx-auto italic">
        Education
      </h2>

      <div className="grid gap-6">
        {education?.map((edu: any) => (
          <div
            key={edu.id}
            className="p-6 bg-slate-900/30 border-l-4 border-blue-600 rounded-r-xl hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h3 className="text-xl font-bold text-slate-100">{edu.titulo}</h3>
              <span className="text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-full text-xs">
                {edu.fechaFin}
              </span>
            </div>
            <p className="text-lg text-slate-300 mt-1">{edu.institucion}</p>
            {edu.descripcion && (
              <p className="text-slate-500 mt-3 text-sm">{edu.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
