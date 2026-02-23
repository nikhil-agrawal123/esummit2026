import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import speakerWindow from "../assets/events/speaker-window.png";
import buttonTexture from "../assets/events/back.png";
import eventsBg from "../assets/events/events-bg.png";

gsap.registerPlugin(ScrollTrigger);

const Speakers = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const windowsRef = useRef<HTMLDivElement[]>([]);
    const buttonRef = useRef<HTMLDivElement>(null);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !windowsRef.current.includes(el)) {
            windowsRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 65%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(headingRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            });

            tl.from(
                windowsRef.current,
                {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.4)",
                },
                "-=0.4",
            );

            tl.from(
                buttonRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.2",
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center py-24 relative overflow-hidden"
            style={{
                backgroundImage: `url(${eventsBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header Area */}
            <div
                ref={headingRef}
                className="text-center mb-16 md:mb-24 relative z-10"
            >
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none relative inline-block"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    SPEAKERS
                </h2>
            </div>

            {/* Grid for the 4 Windows */}
            {/* Adjusted max-width and gap to match the spacing in your original design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10 px-4 max-w-[1400px] w-full mx-auto justify-items-center">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        ref={addToRefs}
                        className="relative flex flex-col items-center transition-transform duration-300 hover:-translate-y-3 cursor-pointer w-full max-w-[300px]"
                    >
                        <div className="relative w-full">
                            {/* Window Image */}
                            <img
                                src={speakerWindow}
                                alt={`Speaker ${item} Window`}
                                className="w-full h-auto drop-shadow-xl select-none relative z-20"
                            />

                            {/* Revealing Soon Text - Fixed position to your 100px mark */}
                            <div className="absolute bottom-[100px] left-0 w-full flex justify-center z-30 pointer-events-none">
                                <p
                                    className="text-2xl md:text-3xl text-[#2d1b2d] font-bold text-center leading-tight drop-shadow-sm"
                                    style={{ fontFamily: "Akumaru, serif" }}
                                >
                                    Revealing
                                    <br />
                                    Soon
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* All Speakers Button */}
            {/* MASSIVE mt-40 to mt-48 added here so the absolute brush texture clears the windows */}
            {/*<div ref={buttonRef} className="mt-40 md:mt-48 relative z-10 flex justify-center">
        <button className="relative group flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
          <img
            src={buttonTexture}
            alt="Texture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span
            className="relative z-10 px-12 py-6 text-3xl md:text-4xl text-[#5e2f0d] drop-shadow-md font-bold tracking-wider group-hover:text-[#2A1B1B] transition-colors"
            style={{ fontFamily: "Akumaru, serif" }}
          >
            All Speakers
          </span>
        </button>
      </div>*/}
        </section>
    );
};

export default Speakers;
