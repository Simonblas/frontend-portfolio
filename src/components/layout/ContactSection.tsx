interface ContactProps {
  email?: string;
}

const ContactSection = ({ email }: ContactProps) => {
  return (
    <section
      id="contact"
      className="py-24 bg-transparent text-white text-center px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          ¿Tienes un proyecto en mente?
        </h2>
        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
          Actualmente estoy buscando nuevas oportunidades y desafíos. Si quieres
          trabajar conmigo o simplemente saludar, ¡mi bandeja de entrada está
          abierta!
        </p>

        {email ? (
          <a
            href={`mailto:${email}`}
            className="group relative inline-block text-2xl md:text-5xl font-bold text-blue-400 hover:text-blue-300 transition-all duration-300"
          >
            {email}
            <span className="block h-1 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-2"></span>
          </a>
        ) : (
          <p className="text-slate-500 italic">
            Cargando información de contacto...
          </p>
        )}

        <div className="mt-16 text-slate-500 text-sm">
          <p>Ubicación: Disponible para trabajo remoto a nivel global.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
