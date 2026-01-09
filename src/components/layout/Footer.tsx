import { useEffect, useState } from "react";
import type { UserProfile } from "../../types/api";
import { portfolioService } from "../../services/apiService";
import githubImg from "../../assets/github.png";
import linkedinImg from "../../assets/linkedin.png";

const Footer = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await portfolioService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error cargando perfil en footer", error);
      }
    };
    loadProfile();
  }, []);

  return (
    <footer className="bg-transparent border-0 py-10 px-6 relative">
      <div className="max-w-5xl mx-auto flex flex-row justify-between items-center gap-2 md:gap-6">
        {/* Logo o Nombre - Alineación a la izquierda en mobile */}
        <div className="flex flex-col items-start sm:justify-start sm:flex-1">
          <span className="text-sm md:text-xl font-light text-gray-400">
            Developed by{" "}
            {profile ? `${profile.nombre} ${profile.apellido}` : "Simon Blas"}
          </span>
          <p className="text-[11px] md:text-sm text-gray-500 mt-1">
            {profile?.titulo || "Fullstack Developer"}
          </p>
        </div>

        {/* Copyright - Oculto en mobile para ahorrar espacio, visible en tablets/desktop */}
        <div className="absolute bottom-20 left-1/3 text-gray-400 text-xs text-center sm:text-sm sm:static sm:bottom-auto sm:block sm:flex-1 sm:flex sm:justify-center">
          © {new Date().getFullYear()} - version 1.1.0
        </div>

        <div className="flex gap-4 md:gap-6 text-sm font-medium sm:flex-1 sm:justify-end">
          {profile?.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 grid place-items-center hover:text-blue-500 transition-colors"
            >
              <img className="w-10" src={githubImg} alt="" />
              <span className="hidden md:block">GitHub</span>
            </a>
          )}
          {profile?.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 grid place-items-center hover:text-blue-500 transition-colors"
            >
              <img className="w-10" src={linkedinImg} alt="" />
              <span className="hidden md:block">LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      <div className="h-24 md:hidden"></div>
    </footer>
  );
};

export default Footer;
