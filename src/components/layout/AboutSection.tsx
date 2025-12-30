interface AboutProps {
  fotoUrl?: string | null;
  sobreMi?: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
}

const AboutSection = ({
  fotoUrl,
  sobreMi,
  githubUrl,
  linkedinUrl,
}: AboutProps) => {
  const getOptimizedImage = (url: string | null | undefined) => {
    if (!url) return "";
    if (!url.includes("cloudinary")) return url;

    // 1. Eliminamos cualquier transformación previa que traiga la URL
    // (Busca todo lo que esté entre /upload/ y /v17...)
    const baseUrl = url.split("/upload/")[0];
    const imagePath = url.split(/\/v\d+/)[1]; // Obtiene: /imagen_cv_owavyo.jpg
    const version = url.match(/\/v(\d+)\//)?.[1]; // Obtiene: 1763988758

    // 2. Construimos la URL desde cero con parámetros de alta calidad
    // c_fill y g_face para que centre la cara automáticamente
    const transformations =
      "f_auto,q_auto:best,w_1200,c_fill,g_face,e_sharpen:50";

    return `${baseUrl}/upload/${transformations}/v${version}${imagePath}`;
  };
  console.log(fotoUrl);
  return (
    <section
      id="about"
      className="py-20 px-6 max-w-5xl mx-auto border-b-1 border-b-gray-500/50"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Contenedor de Imagen */}
        <div className="bg-transparent aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-blue-400">
          {fotoUrl ? (
            <img
              src={getOptimizedImage(fotoUrl)}
              alt="Professional profile"
              className="w-full h-full object-cover "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
              Foto de perfil
            </div>
          )}
        </div>

        {/* Contenedor de Texto */}
        <div>
          <h2 className="text-3xl font-bold mb-6 w-fit italic">
            About Me
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
            {sobreMi || "Cargando descripción profesional..."}
          </p>

          <div className="mt-8 flex gap-6">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
              >
                <span>GitHub</span>
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
              >
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
