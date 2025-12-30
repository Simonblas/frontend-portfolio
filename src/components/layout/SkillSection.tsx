import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";

const SkillSection = () => {
  const {
    data: skills,
    loading,
    request: fetchSkills,
  } = useApi(portfolioService.getSkills);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 inline-block italic">
          Skills
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-10 w-24 bg-slate-800 rounded-full"></div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {skills?.map((skill: any) => (
            <div
              key={skill.id}
              className="group flex flex-col items-center p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Si tienes iconos en el backend, los renderizas aquí */}
              <span className="text-lg font-semibold text-slate-300 group-hover:text-emerald-400">
                {skill.nombre}
              </span>
              <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${skill.porcentaje}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillSection;
