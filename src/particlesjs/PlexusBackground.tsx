import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const PlexusBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 120, // Radio de influencia del ratón
            duration: 0.4, // Qué tan rápido reaccionan
            factor: 30, // Fuerza del empuje
            speed: 1, // Velocidad de retorno
            maxSpeed: 50,
          },
        },
      },
      particles: {
        color: { value: "#63b3ed" },
        links: {
          color: "#e2e8f0",
          distance: 140,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
          attract: { enable: false },
        },
        number: {
          density: { enable: true, area: 800 },
          value: 90,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: false,
    }),
    [],
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute h-screen inset-0 -z-10 pointer-events-none"
      options={options}
    />
  );
};
