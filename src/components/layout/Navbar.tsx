import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import homeImg from "../../assets/home.png";
import loginImg from "../../assets/login.png";
import projectImg from "../../assets/project.png";
import experienceImg from "../../assets/experience.png";
import contactImg from "../../assets/contact.png";
import adminImg from "../../assets/admin.png";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavClick = (id: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <>
      {/* --- DISEÑO ESCRITORIO --- */}
      <nav className="hidden md:flex fixed top-0 w-full h-16 z-50 px-12 items-center justify-between backdrop-blur-3xl animate-blink">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-white/55 transition"
        >
          <p className="font-sans text-[20px]/5">Simon Blas</p>
          <p className="font-light text-[14px]">Software Developer</p>
        </Link>

        <div className="flex gap-8 items-center font-medium text-gray-200">
          <button
            onClick={() => handleNavClick("about")}
            className="hover:text-white/55 transition"
          >
            About
          </button>

          <button
            onClick={() => handleNavClick("experience")}
            className="hover:text-white/55 transition"
          >
            Experience
          </button>

          <button
            onClick={() => handleNavClick("projects")}
            className="hover:text-white/55 transition"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick("skills")}
            className="hover:text-white/55 transition"
          >
            Skills
          </button>
          <button
            onClick={() => handleNavClick("education")}
            className="hover:text-white/55 transition"
          >
            Education
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="hover:text-white/55 transition"
          >
            Contact
          </button>
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white/55 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition text-sm font-medium border-l border-slate-700 pl-4"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- DISEÑO MOBILE --- */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 z-50 flex items-center justify-around px-2 text-gray-100 bg-black/50 backdrop-blur-3xl border-t border-slate-500/30 animate-blink">
        <button
          onClick={() => handleNavClick("hero")}
          className="flex flex-col items-center text-xs"
        >
          <span className="text-xl">
            <img className="w-6" src={homeImg} alt="Home" />
          </span>
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNavClick("experience")}
          className="flex flex-col items-center text-xs"
        >
          <span className="text-xl">
            <img src={experienceImg} alt="experience" className="w-6" />
          </span>
          <span>Experience</span>
        </button>
        <button
          onClick={() => handleNavClick("projects")}
          className="flex flex-col items-center text-xs"
        >
          <span className="text-xl">
            <img src={projectImg} alt="project" className="w-6" />
          </span>
          <span>Projects</span>
        </button>
        <button
          onClick={() => handleNavClick("contact")}
          className="flex flex-col items-center text-xs"
        >
          <span className="text-xl">
            <img src={contactImg} alt="contact" className="w-6" />
          </span>
          <span>Contact</span>
        </button>

        <Link
          to={isAuthenticated ? "/admin" : "/login"}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex flex-col items-center text-xs"
        >
          <span className="text-xl">
            <img
              src={isAuthenticated ? adminImg : loginImg}
              alt="login"
              className="w-6"
            />
          </span>
          <span>{isAuthenticated ? "Admin" : "Login"}</span>
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-xs"
          >
            <span className="text-xl">
              <img src={loginImg} alt="login" className="w-6" />
            </span>
            <span className="text-red-400">Logout</span>
          </button>
        )}
      </nav>
    </>
  );
};
