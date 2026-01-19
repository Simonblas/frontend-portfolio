import { useState } from "react";
import EducationManagement from "../../components/admin/EducationManagement";
import ExperienceManagement from "../../components/admin/ExperienceManagement";
import ProjectManagement from "../../components/admin/ProjectManagement";
import SkillManagement from "../../components/admin/SkillManagement";
import UserManagement from "../../components/admin/UserManagement";

type TabType = "profile" | "skills" | "experience" | "education" | "projects";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  const renderManagement = () => {
    switch (activeTab) {
      case "profile": return <UserManagement />;
      case "skills": return <SkillManagement />;
      case "experience": return <ExperienceManagement />;
      case "education": return <EducationManagement />;
      case "projects": return <ProjectManagement />;
      default: return <ProjectManagement />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen animate-blink">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Control Panel</h1>
        <p className="text-slate-400">Manage your portfolio content and personal information</p>
      </header>

      {/* Menú de Navegación del Admin */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl border border-white/5 shadow-xl">
        {(["profile", "skills", "experience", "education", "projects"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenedor del componente activo */}
      <div className="bg-slate-900/40 backdrop-blur-md border min-h-screen border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300">
        {renderManagement()}
      </div>
    </div>
  );
};