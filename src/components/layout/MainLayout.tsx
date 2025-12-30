import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen text-slate-200  bg-black/90 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_30%)]">
      <Navbar />
      {/* El padding-top (pt-20) es para que el contenido no quede tapado por el navbar de escritorio */}
      {/* El padding-bottom (pb-20) es para que el contenido no quede tapado por el navbar de móvil */}
      <main className="pt-0 md:pt-16 pb-20 md:pb-0">{children}</main>

      <Footer />
    </div>
  );
};
