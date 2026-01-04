import type { Skill } from "../../types/api";

interface ProjectCardProps {
  titulo: string;
  descripcion: string;
  imageUrl?: string | null;
  urlRepo?: string | null;
  urlDemo?: string | null;
  fecha?: string;
  skills?: Skill[];
}

const ProjectCard = ({
  titulo,
  descripcion,
  imageUrl,
  urlRepo,
  urlDemo,
  fecha,
  skills,
}: ProjectCardProps) => {

  const getOptimizedProjectImage = (url: string | null | undefined) => {
    if (!url) return "";
    if (!url.includes("cloudinary")) return url;
    
    return url.replace(
      "/upload/",
      "/upload/f_auto,q_auto:eco,w_600,c_fill,g_north,e_sharpen:50/"
    );
  };

  return (
    <div className="bg-blue-300/10 border border-white/10 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all duration-500 flex flex-col group h-full">
      
      {/* IMAGEN DEL PROYECTO */}
      <div className="h-52 overflow-hidden bg-slate-800 relative">
        {imageUrl ? (
          <img
            src={getOptimizedProjectImage(imageUrl)}
            alt={`Screenshot of ${titulo}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 italic text-xs">
            No preview available
          </div>
        )}
        
        {/* Badge de Fecha - Usamos split para evitar errores de zona horaria en JS */}
        {fecha && (
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded-md border border-white/10 z-10">
            {fecha.split('-')[0]}
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {titulo}
        </h3>
        
        {/* Descripción */}
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {descripcion}
        </p>

        {/* LISTA DE SKILLS (TECNOLOGÍAS) */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="text-[10px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-md hover:bg-blue-500/20 transition-colors"
              >
                {skill.nombre}
              </span>
            ))}
          </div>
        )}

        {/* ENLACES / ACCIONES */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          {urlRepo && (
            <a
              href={urlRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group/link"
              aria-label={`View ${titulo} source code on GitHub`}
            >
              <span>GitHub</span>
              <svg 
                className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          {urlDemo && (
            <a
              href={urlDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;