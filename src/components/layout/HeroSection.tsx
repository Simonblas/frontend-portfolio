import { useLocation, useNavigate } from "react-router-dom";

interface HeroProps {
  nombre?: string;
  titulo?: string;
  cvUrl?: string | null;
}

const HeroSection = ({ nombre, titulo, cvUrl }: HeroProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = "contact";
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-transparent"
    >
      <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-4 tracking-tight">
        Hi, I'm <span className="text-blue-400">{nombre || "Simon"}</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
        {titulo || "Fullstack Developer"}
      </p>

      <div className="mt-10 flex gap-4 ">
        <button
          onClick={handleContactClick}
          className="bg-blue-400 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-400/30 transition shadow-lg shadow-lg text-center"
        >
          Contact Me
        </button>

        {cvUrl ? (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-blue-400 px-10 py-4 rounded-full font-bold hover:bg-blue-400/30 transition text-center"
          >
            View CV
          </a>
        ) : (
          <button
            type="button"
            className="border-2 border-blue-400 px-10 py-4 rounded-full font-bold hover:bg-blue-400/30 transition text-center cursor-not-allowed opacity-50"
          >
            View CV
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
