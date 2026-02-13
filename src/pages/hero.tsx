import twentySix from "../assets/heroTitle.svg";
import passBrushstroke from "../assets/passBrushstroke.webp";
import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        <div ref={bgRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: "url('/bg-layer.png')" }} />
        <div ref={hutRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10" style={{ backgroundImage: "url('/hut-layer.png')" }}/>
        <div ref={rocksRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat z-20" style={{ backgroundImage: "url('/rocks-layer.png')" }}/>
        <div ref={transitionRef} className="absolute left-0 right-0 -bottom-60 h-60 bg-no-repeat bg-center pointer-events-none will-change-transform z-30" style={{ backgroundImage: "url('/background1.png')" }}/>
        <div ref={contentRef} className="absolute bottom-15 left-30 z-30">
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
      </section>
      
    </>
  );
});

export default Hero;
