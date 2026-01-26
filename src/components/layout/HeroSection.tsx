import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typed from "typed.js";

interface HeroProps {
  nombre?: string;
  titulo?: string;
  cvUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  email?: string;
}

const HeroSection = ({ nombre, titulo, cvUrl, githubUrl, linkedinUrl, email }: HeroProps) => {
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

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [nombre || "Simon"],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2000,
      smartBackspace: true,
      loop: true,
      cursorChar: "",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[90vh] mb-3 md:mb-0 relative flex flex-col items-center justify-center text-center px-6 bg-transparent animate-blink"
    >
      <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-4 tracking-tight" translate="no" aria-label={`Hi, I'm ${nombre || "Simon"}`}>
        Hi, I'm <span ref={el} className="text-blue-400"></span>
      </h1>
      <p className="text-lg md:text-2xl text-slate-400 max-w-2xl font-light">{titulo || "Fullstack Developer"}</p>

      <div className="mt-10 flex gap-6 ">
        <button
          onClick={handleContactClick}
          className="bg-blue-400 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold hover:bg-blue-400/50 transition shadow-lg text-center backdrop-blur-sm"
        >
          Contact Me
        </button>

        {cvUrl ? (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-blue-400 px-8 py-3 md:px-10 md:py-4 rounded-full font-bold hover:bg-blue-400/30 transition text-center bg-blue-400/5 backdrop-blur-sm"
          >
            View CV
          </a>
        ) : (
          <button
            type="button"
            className="border-2 border-blue-400 px-10 py-4 rounded-full font-bold hover:bg-blue-400/30 transition text-center cursor-not-allowed opacity-50 bg-blue-400/5 backdrop-blur-sm"
          >
            View CV
          </button>
        )}
      </div>
      <div className="mt-8 flex justify-between gap-10 mb-0">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
          >
            <span>GitHub</span>
          </a>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
          >
            <span>LinkedIn</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
          >
            <span>Email</span>
          </a>
        )}
      </div>
      <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute bottom-16 md:bottom-16 left-1/2 -translate-x-1/2">
          <svg
            className="w-11 h-11 text-blue-400/60 animate-iteration-count-infinite animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
