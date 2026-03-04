import twentySix from "../assets/heroTitle.svg";
import passBrushstroke from "../assets/passBrushstroke.webp";
import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import bg from "../assets/about_background.png";
import mobile_26 from "../assets/26_mobile.svg";
import mobile_esummit from "../assets/Esummit_mobile.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const hutRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const rocksRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref || typeof ref === "function") return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      })
        .to(bgRef.current, { y: 0, ease: "none" }, 0)
        .to(hutRef.current, { y: -100, ease: "power3.out" }, 0)
        .to(transitionRef.current, { y: -240, ease: "power4.out" }, 0)
        .to(rocksRef.current, { y: -240, ease: "power4.out" }, 0)
        .to(contentRef.current, { scale: 0, duration: 0.2 }, 0);
    });

    return () => ctx.revert();
  }, [ref]);

  return (
    <>
      <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
        <div ref={bgRef} className="hero-bg-layer" style={{ backgroundImage: "url('/bg-layer.webp')" }} />
        <div ref={hutRef} className="hero-hut-layer" style={{ backgroundImage: "url('/hut-layer.webp')" }}/>
        <div ref={rocksRef} className="hero-rocks-layer" style={{ backgroundImage: "url('/rocks-layer.webp')" }}/>
        <div ref={transitionRef} className="absolute left-0 right-0 -bottom-60 h-60 bg-no-repeat bg-center pointer-events-none will-change-transform z-30" style={{ backgroundImage: `url(${bg})` }}/>
        
        {windowWidth < 768 && (
          <div className="hero-mobile-layout flex justify-around items-center">
            <img src={mobile_esummit} alt="ESUMMIT" className="self-start my-20!" />
            <img src={mobile_26} alt="26" className="self-end my-60!" />
          </div>
        )}
        
        {windowWidth < 768 && (
          <div className="hero-mobile-pass-container">
            <div className="hero-mobile-pass-wrapper">
              <img src={passBrushstroke} alt="" className="hero-mobile-pass-img" />
              <a href="/pass" className="hero-mobile-pass-link">
                Get Your Pass
              </a>
            </div>
          </div>
        )}
        
        {windowWidth >= 768 && (
          <div ref={contentRef} className="hero-desktop-content">
            <div className="flex items-center justify-center flex-col">
              <img src={twentySix} alt="26" className="w-lg" />
              <div className="w-96 flex items-center justify-center relative">
                <img src={passBrushstroke} alt="" />
                <a href="/pass" className="absolute inset-0 flex items-center justify-center font-['Akumaru'] text-[43px] text-[#98440C]">
                  Get Your Pass
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
      
    </>
  );
});

export default Hero;
