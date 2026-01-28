import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar/navbar";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const firstHeroRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    if (!firstHeroRef.current || !navbarRef.current) return;

    gsap.to(navbarRef.current, {
      x: () => window.innerWidth,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: firstHeroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <div
        ref={firstHeroRef}
        className="min-h-screen w-full absolute bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.webp')" }}
      />

      <Navbar ref={navbarRef} />

      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.webp')" }} />
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.webp')" }} />
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.webp')" }} />
    </>
  );
};

export default Hero;
