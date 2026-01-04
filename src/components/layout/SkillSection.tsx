import { useEffect, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";
import type { Skill } from "../../types/api";

const SkillSection = () => {
  const {
    data: skills,
    loading,
    request: fetchSkills,
  } = useApi(portfolioService.getSkills);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const groupedSkills = useMemo(() => {
    if (!skills) return {};
    return skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
      const category = skill.categoria || "Others";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-2 text-center w-fit mx-auto italic">
          Skills
        </h2>
        <p className="text-slate-400 mt-0">
          My skills, organized by categories
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 rounded-3xl md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-48 bg-slate-900/50 rounded-3xl border border-slate-800"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 auto-rows-fr">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div
              key={category}
              className="h-full bg-gray-100/10 border border-slate-800/60 p-8 rounded-3xl backdrop-blur-sm hover:border-blue-400/20 transition-colors"
            >
              {/* Título de la Categoría */}
              <h3 className="text-sky-400 text-base font-black uppercase tracking-[0.3em] mb-8 border-l-4 border-sky-400 pl-4">
                {category}
              </h3>

              {/* Contenedor de Skills dentro de la categoría */}
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group flex items-center gap-2 p-4 bg-transparent border border-slate-700 rounded-xl hover:bg-blue-400/5 transition-all duration-300"
                  >
                    {/* Renderizado de icono si existe */}
                    {skill.iconoUrl ? (
                      <img
                        src={skill.iconoUrl}
                        alt={skill.nombre}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span className="text-sky-400">⚡</span>
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200 group-hover:text-white">
                        {skill.nombre}
                      </span>
                      <span className="text-[10.5px] text-slate-500 uppercase tracking-tight">
                        {skill.nivel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillSection;
