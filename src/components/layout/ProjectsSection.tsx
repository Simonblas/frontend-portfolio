import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { portfolioService } from "../../services/apiService";
import ProjectCard from "../common/ProjectCard";
import type { Project } from "../../types/api";
import { ScrollRevealY } from "../../reveal/ScrollReveal";

const ProjectsSection = () => {
  const { data: projects, loading, request: fetchProjects } = useApi(portfolioService.getProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto border-b-1 border-b-gray-500/50">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mx-auto mb-2 w-fit italic ">Projects</h2>
        <p className="text-slate-400">A selection of my latest projects.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-800 animate-pulse rounded-xl backdrop-blur-xs"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project: Project, index: number) => (
            <ScrollRevealY key={project.id} delay={(index) * 0.2}>
              <ProjectCard key={project.id} {...project} />
            </ScrollRevealY>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
