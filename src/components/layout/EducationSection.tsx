import { useEffect, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";
import { type Education } from "../../types/api";
import { ScrollRevealY } from "../../reveal/ScrollReveal";

const EducationSection = () => {
  const { data: education, loading, request: fetchEdu } = useApi<Education[]>(portfolioService.getEducation);

  useEffect(() => {
    fetchEdu();
  }, [fetchEdu]);

  const sortedEducation = useMemo(() => {
    if (!education) return [];
    return [...education].sort((a, b) => {
      const dateA = new Date(a.fechaInicio || 0).getTime();
      const dateB = new Date(b.fechaInicio || 0).getTime();
      return dateB - dateA;
    });
  }, [education]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    const [year, month] = dateStr.split("-");
    return `${month}/${year}`;
  };

  return (
    <section id="education" className="py-20 px-4 md:px-6 max-w-4xl mx-auto border-b-1 border-b-gray-500/50">
      <h2 className="text-3xl font-bold mb-12 text-center w-fit mx-auto italic">Education</h2>

      <div className="grid gap-6">
        {loading
          ? [1, 2].map((n) => <div key={n} className="h-32 bg-slate-800/50 animate-pulse rounded-xl border-l-4 border-slate-700 backdrop-blur-md" />)
          : sortedEducation.map((edu: Education, index: number) => (
              <ScrollRevealY key={edu.id} delay={index * 0.15}>
                <div className="group p-4 md:p-6 bg-gray-100/10 border-l-4 border-blue-400 rounded-r-xl hover:bg-blue-200/5 transition-all duration-300 flex flex-row gap-3 md:gap-6 items-center overflow-hidden backdrop-blur-md">
                  <div className="shrink-0">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-md md:rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1.5 md:p-2 group-hover:border-blue-400/50 transition-colors">
                      {edu.logoUrl ? (
                        <img
                          src={edu.logoUrl}
                          alt={edu.institucion}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-blue-400 text-lg md:text-3xl font-black">{edu.institucion.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                        <div className="min-w-0">
                          <h3 className="text-sm md:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight truncate md:whitespace-normal">
                            {edu.titulo}
                          </h3>
                          <p className="text-xs md:text-lg text-slate-300 font-medium truncate md:whitespace-normal">{edu.institucion}</p>
                        </div>

                        <div className="shrink-0 mt-0.5 md:mt-0">
                          <span className="inline-block text-slate-400 font-mono font-bold bg-blue-400/10 px-2 md:px-4 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs whitespace-nowrap border border-blue-400/20">
                            {formatDate(edu.fechaInicio)} — {formatDate(edu.fechaFin)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {edu.descripcion && (
                      <p className="hidden md:block text-slate-500 mt-3 text-sm leading-relaxed border-t border-white/5 pt-2 italic line-clamp-2 md:line-clamp-none">
                        {edu.descripcion}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollRevealY>
            ))}
      </div>
    </section>
  );
};

export default EducationSection;
