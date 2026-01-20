import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { PlexusBackground } from "../../particlesjs/PlexusBackground";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen z-10 overflow-x-hidden text-slate-200 bg-black/90 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_10%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_10%)] md:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_20%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_20%)]">
      <PlexusBackground />
      <Navbar />
      <main className="z-10 pt-0 md:pt-16 pb-20 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
};
