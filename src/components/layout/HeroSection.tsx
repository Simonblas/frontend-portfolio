import { useEffect, useState } from "react";
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

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[90vh] relative flex flex-col items-center justify-center text-center px-6 bg-transparent"
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
          className="bg-blue-400 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-400/50 transition shadow-lg shadow-lg text-center"
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

      <div
        className={`transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2">
          <svg
            className="w-9 h-9 text-blue-400/60 animate-iteration-count-infinite animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
