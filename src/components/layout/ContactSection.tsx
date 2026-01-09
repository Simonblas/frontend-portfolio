import { useState } from "react";
import imgLocationWhite from "../../assets/map-pin-line (1).png";

interface ContactProps {
  email?: string;
}

const ContactSection = ({ email }: ContactProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      // El mensaje vuelve a la normalidad después de 2 segundos
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-transparent text-white mx-auto text-center px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center w-fit mx-auto italic">
          Contact
        </h2>
        <p className="mt-0 text-slate-400 mb-12 leading-relaxed">
          Im currently open to new job opportunities. Please feel free to
          contact me.
        </p>

        <div className="flex flex-col items-center group">
          {email ? (
            <div className="relative">
              <a
                href={`mailto:${email}`}
                className="text-2xl md:text-4xl font-bold text-slate-100 hover:text-blue-300 transition-all duration-500 tracking-tight"
              >
                {email}
              </a>
              <span className="block h-[1px] bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></span>
            </div>
          ) : (
            <p className="text-slate-600 animate-pulse">Loading email...</p>
          )}

          <button
            onClick={copyToClipboard}
            className={`mt-8 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
              copied
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                : "bg-white/5 border-white/20 text-slate-400 hover:text-blue-300 hover:border-blue-300/50"
            }`}
          >
            {copied ? "Copied!" : "Click to copy email"}
          </button>
        </div>

        <div className="mt-10 text-slate-500 text-sm space-y-2">
          <p className="text-slate-400 font-medium">
            Open to
            <span className="text-blue-300">
              {" "}
              full-time remote opportunities{" "}
            </span>
            and <span className="text-blue-300"> relocation</span>.
          </p>
          <p className="flex items-center justify-center gap-2">
            <img className="w-4" src={imgLocationWhite} alt="" />
            Location: <strong>Azul, Buenos Aires, Argentina</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
