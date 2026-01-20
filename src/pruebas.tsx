import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Para animaciones extra
import { ScrollRevealY } from "../../reveal/ScrollReveal";
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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent text-white mx-auto text-center px-6">
      <ScrollRevealY>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center w-fit mx-auto italic">
            Contact
          </h2>
          <p className="mt-0 text-slate-400 mb-12 leading-relaxed">
            I'm currently open to new job opportunities. Please feel free to contact me.
          </p>

          <div className="flex flex-col items-center group">
            {email ? (
              <div className="relative">
                <a
                  href={`mailto:${email}`}
                  className="text-2xl md:text-5xl font-bold text-slate-100 hover:text-blue-300 transition-all duration-500 tracking-tight"
                >
                  {email}
                </a>
                {/* Línea animada inferior */}
                <span className="block h-[1px] bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></span>
              </div>
            ) : (
              <div className="h-10 w-64 bg-slate-800/50 animate-pulse rounded-lg" />
            )}

            {/* Botón con feedback de Framer Motion */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className={`mt-8 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 shadow-lg ${
                copied
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                  : "bg-white/5 border-white/20 text-slate-400 hover:text-blue-300 hover:border-blue-300/50"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {copied ? "¡Copied!" : "Click to copy email"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="mt-16 text-slate-500 text-sm space-y-3">
            <p className="text-slate-400 font-medium">
              Open to 
              <span className="text-blue-300"> full-time remote opportunities </span> 
              and <span className="text-blue-300">relocation</span>.
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <img className="w-4 h-4 opacity-70" src={imgLocationWhite} alt="Location icon" />
              <span>Azul, Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
      </ScrollRevealY>
    </section>
  );
};

export default ContactSection;