import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";
import HeroSection from "../../components/layout/HeroSection";
import AboutSection from "../../components/layout/AboutSection";
import ContactSection from "../../components/layout/ContactSection";
import ProjectsSection from "../../components/layout/ProjectsSection";
import ExperienceSection from "../../components/layout/ExperienceSection";
import SkillSection from "../../components/layout/SkillSection";
import EducationSection from "../../components/layout/EducationSection";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = (location.state as any)?.scrollTo;

    if (scrollTarget) {
      const scrollToElement = () => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Una vez hecho el scroll, limpiamos el estado
          window.history.replaceState({}, document.title);
        } else {
          // Si no lo encuentra, reintentar en 100ms (útil si la API tarda)
          setTimeout(scrollToElement, 100);
        }
      };

      // Primer intento con un delay inicial para permitir que el loading pase
      setTimeout(scrollToElement, 300);
    }
  }, [location]);

  const {
    data: profile,
    loading,
    request: fetchProfile,
  } = useApi(portfolioService.getProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-transparent text-blue-300 font-bold">
        Loading server... The backend may take a few seconds to start due to the
        use of free infrastructure.
      </div>
    );

  return (
    <>
      <HeroSection
        nombre={profile?.nombre}
        titulo={profile?.titulo}
        cvUrl={profile?.curriculumPdfUrl}
      />

      <AboutSection
        fotoUrl={profile?.fotoUrl}
        sobreMi={profile?.sobreMi}
        githubUrl={profile?.githubUrl}
        linkedinUrl={profile?.linkedinUrl}
      />
      <ExperienceSection />
      <ProjectsSection />
      <SkillSection />
      <EducationSection />
      <ContactSection email={profile?.emailContacto} />
    </>
  );
};

export default Home;
