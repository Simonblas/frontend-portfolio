import { useEffect, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";
import type { Experience } from "../../types/api";
import { ScrollRevealXLeft, ScrollRevealXRight } from "../../reveal/ScrollReveal";

const ExperienceSection = () => {
  const { data: experiences, request: fetchExp } = useApi(portfolioService.getExperiences);

  useEffect(() => {
    fetchExp();
  }, [fetchExp]);

  const sortedExperiences = useMemo(() => {
    if (!experiences) return [];
    return [...experiences].sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
  }, [experiences]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-16 text-center w-fit mx-auto italic">Experience</h2>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {sortedExperiences.map((exp: Experience, index: number) => {
          const isLeft = index % 2 !== 0;
          const Reveal = isLeft ? ScrollRevealXLeft : ScrollRevealXRight;

          return (
            <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Punto de la línea de tiempo */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-[72%] md:group-even:translate-x-[72%]">
                <div className="w-2 h-2 bg-green-200 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>

              {/* Tarjeta con Reveal Escalonado */}
              <div className="w-[calc(100%-4rem)] md:w-[45%]">
                <Reveal delay={index * 0.15}>
                  <div className="p-5.5 rounded-xl border border-slate-800 bg-gray-100/10 hover:border-blue-400/30 transition-all duration-200 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                      <div className="font-bold text-slate-100 text-[17px]">{exp.puesto}</div>
                      <time className="font-medium text-blue-300 text-xs whitespace-nowrap">
                        {formatDate(exp.fechaInicio)} - {exp.fechaFin ? formatDate(exp.fechaFin) : "Present"}
                      </time>
                    </div>
                    <div className="text-blue-300 font-medium text-sm mb-2">{exp.empresa}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{exp.descripcion}</div>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default ExperienceSection;
