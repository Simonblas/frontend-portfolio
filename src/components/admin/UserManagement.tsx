import { useEffect, useState } from "react";
import { portfolioService, adminService } from "../../services/apiService";
import type { UserProfile } from "../../types/api";

const UserManagement = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await portfolioService.getProfile();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setIsSaving(true);
    try {
      await adminService.updateProfile(profile);
      alert("¡Perfil actualizado con éxito!");
    } catch (error) {
      alert("Error al actualizar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-white p-8 text-center animate-pulse">Cargando perfil...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white italic">User Settings</h2>
          <p className="text-slate-400 text-sm">Manage your public portfolio information</p>
        </div>
        <button 
          form="profile-form"
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-8 py-2.5 rounded-xl font-bold max-sm:hidden transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-8 pb-20">
        
        {/* SECCIÓN 1: IDENTIDAD VISUAL Y BÁSICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="md:col-span-3 text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
            Identity & Media
          </div>
          
          {/* Foto de Perfil (Input de URL) */}
          <div className="md:col-span-1 flex flex-col items-center justify-center space-y-4 border-r border-white/5 pr-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/30 bg-slate-800">
                {profile?.fotoUrl ? (
                    <img src={profile.fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs italic">No photo</div>
                )}
            </div>
            <div className="w-full">
                <label className="text-[10px] text-slate-500 block mb-1 uppercase text-center">Profile Image URL</label>
                <input 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500"
                    value={profile?.fotoUrl || ""}
                    onChange={e => setProfile({...profile!, fotoUrl: e.target.value})}
                    placeholder="Cloudinary link..."
                />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-slate-400 block mb-1 uppercase">First Name</label>
                <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-blue-500"
                    value={profile?.nombre || ""}
                    onChange={e => setProfile({...profile!, nombre: e.target.value})}
                    required
                />
            </div>
            <div>
                <label className="text-xs text-slate-400 block mb-1 uppercase">Last Name</label>
                <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-blue-500"
                    value={profile?.apellido || ""}
                    onChange={e => setProfile({...profile!, apellido: e.target.value})}
                    required
                />
            </div>
            <div className="sm:col-span-2">
                <label className="text-xs text-slate-400 block mb-1 uppercase">Professional Title</label>
                <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-blue-500"
                    value={profile?.titulo || ""}
                    onChange={e => setProfile({...profile!, titulo: e.target.value})}
                    placeholder="Ej: Senior Java Developer"
                />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: LOCALIZACIÓN Y CONTACTO DIRECTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="md:col-span-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
            Location & Contact
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 uppercase">Contact Email</label>
            <input 
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-blue-500"
              value={profile?.emailContacto || ""}
              onChange={e => setProfile({...profile!, emailContacto: e.target.value})}
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 uppercase">Location</label>
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-blue-500"
              value={profile?.ubicacion || ""}
              onChange={e => setProfile({...profile!, ubicacion: e.target.value})}
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* SECCIÓN 3: BIOGRAFÍA */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">Biography / About Me</div>
          <textarea 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white h-48 resize-none outline-none focus:ring-1 ring-blue-500 leading-relaxed"
            value={profile?.sobreMi || ""}
            onChange={e => setProfile({...profile!, sobreMi: e.target.value})}
            placeholder="Tell your story..."
          />
        </div>

        {/* SECCIÓN 4: RECURSOS Y REDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="md:col-span-3 text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
            Links & Resources
          </div>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1 uppercase">GitHub</label>
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none"
              value={profile?.githubUrl || ""}
              onChange={e => setProfile({...profile!, githubUrl: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 uppercase">LinkedIn</label>
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none"
              value={profile?.linkedinUrl || ""}
              onChange={e => setProfile({...profile!, linkedinUrl: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 uppercase text-fuchsia-400">CV PDF URL</label>
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 ring-fuchsia-500"
              value={profile?.curriculumPdfUrl || ""}
              onChange={e => setProfile({...profile!, curriculumPdfUrl: e.target.value})}
              placeholder="Google Drive or Cloudinary link..."
            />
          </div>

          <div className="md:col-span-3 pt-4">
             <button 
              type="submit"
              disabled={isSaving}
              className="md:hidden w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default UserManagement;