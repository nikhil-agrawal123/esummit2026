import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowLeft, ChevronUp } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import passBrushstroke from "../assets/passBrushstroke.webp";

gsap.registerPlugin(ScrollTrigger);

import bgMain from "../assets/team/background.webp";
import bgLeft from "../assets/team/left-bg.webp";
import bgRight from "../assets/team/right-bg.webp";
import toriGate from "../assets/team/tori-gate.webp";
import teamData from "../data/teamData.json";

interface teamProps {
    startTransition: (targetRoute: string) => void;
}

const TeamPage = ({ startTransition }: teamProps) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    useGSAP(
        () => {

            // DESKTOP ANIMATION (UNCHANGED)

            gsap.set(".tori-gate", { xPercent: -50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 1,
                    pinSpacing: false,
                },
            });

            tl.to(".team-text", { scale: 2, opacity: 0, duration: 0.3 }, 0);

            tl.to(
                ".tori-gate",
                {
                    scale: 35,
                    transformOrigin: "50% 65%",
                    ease: "power2.inOut",
                    duration: 0.7,
                },
                0,
            );

            tl.to(".tori-gate", { opacity: 0, duration: 0.1 }, 0.9);

            gsap.set(gridRef.current, {
                y: -1700,
                scale: 0.25,
            });

            gsap.to(gridRef.current, {
                scale: 1,
                y: -250,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 95%",
                    end: "bottom 90%",
                    scrub: true,
                    pinSpacing: "margin",
                    pin: true,
                },
            });

        },
        { scope: heroRef },
    );
    useGSAP(
        ()=>{
            gsap.set([".left-mountain", 
                ".right-mountain"
            ], {
                scale: 1.25,
            })
            const addScrollTrigger = ()=>{
                return {scrollTrigger: {
                    trigger: ".photo-grid",
                    start: "top 95%",
                    end: "bottom 150%",
                    scrub: true,
                }}
            }
            gsap.to([".left-mountain", 
                ".right-mountain"
            ], {
                opacity: 0.6,
                zIndex: 5,
                ...addScrollTrigger()
            });
            gsap.to(".left-mountain", {
                xPercent: -10,
                yPercent: 10,
                scale: 0.95,
                ...addScrollTrigger()
            })
            gsap.to(".right-mountain", {
                xPercent: 10,
                yPercent: 10,
                scale: 0.95,
                ...addScrollTrigger()
            })

        }
    )
    return (
        <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden">

            {/* Back Button */}

            <div
                onClick={() => startTransition("/")}
                className="fixed w-45 top-6 left-12 z-9997 flex items-center gap-2 px-4 py-2 overflow-hidden scale-150 cursor-pointer"
            >
                <img
                    src={passBrushstroke}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                <div className="content flex items-center justify-center gap-2 mx-6!">
                    <ArrowLeft size={18} className="text-[#9c4308] relative z-10" />
                    <span className="font-semibold tracking-wide relative z-10 font-['Akumaru'] text-[25px] text-[#9c4308]">
                        Home
                    </span>
                </div>
            </div>

            {/* Background */}

            <div
                className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${bgMain})` }}
            />

            {/* HERO */}

            {!isMobile ? (

                /* ---------------- DESKTOP HERO (UNCHANGED) ---------------- */

                <section
                    ref={heroRef}
                    className="relative h-screen w-full z-20 pointer-events-none"
                >
                    <img
                        src={toriGate}
                        alt="Tori Gate"
                        className="tori-gate absolute bottom-0 left-1/2 w-auto max-w-full max-h-[85vh] object-contain object-bottom"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2
                            className="team-text text-2xl sm:text-4xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] select-none tracking-widest text-center px-4"
                            style={{
                                fontFamily: "Akumaru, serif",
                                y: -50,
                                color: "#371B2E",
                            }}
                        >
                            OUR TEAM
                        </h2>
                    </div>
                </section>

            ) : (

                /* ---------------- MOBILE HERO ---------------- */

                <section className="relative h-screen w-full flex flex-col items-center justify-center z-20">
                    {/* Swipe up hint — mobile only */}
                    <motion.div
                        className="absolute bottom-10 flex flex-col items-center text-[#371B2E]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{
                            delay: 1,
                            duration: 11, // 1s fade in + 10s animation
                            times: [0, 0.1, 0.9, 1]
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 2,
                                repeat: 4, // 5 total runs (initial + 4 repeats)
                                ease: "easeInOut"
                            }}
                            className="flex flex-col items-center"
                        >
                            <ChevronUp size={32} />
                            <span className="text-xs tracking-widest mt-1">SWIPE</span>
                        </motion.div>
                    </motion.div>
                    <div className="relative flex items-center justify-center">

                        <img
                            src={toriGate}
                            alt="Tori Gate"
                            className="mobile-tori-gate absolute -bottom-60 left-1/2 -translate-x-1/2 max-w-none"
                        />

                        <h2
                            className="mobile-team-text absolute -top-[7.5%] text-6xl tracking-[0.35em] text-[#371B2E]"
                            style={{
                                fontFamily: "Akumaru, serif",
                                writingMode: "vertical-rl",
                                textOrientation: "upright",
                            }}
                        >
                            TEAM
                        </h2>

                    </div>

                </section>

            )}

            {/* Mountains (DESKTOP ONLY) */}

            <img
                src={bgLeft}
                alt="Left Mountain"
                className="fixed left-mountain top-96 left-0 z-9997 w-auto max-w-[50vw] max-h-[50vh] object-contain object-bottom hidden sm:block"
            />

            <img
                src={bgRight}
                alt="Right Mountain"
                className="fixed right-mountain top-96 -right-5 z-9997 w-auto max-w-[50vw] max-h-[50vh] object-contain object-bottom hidden sm:block"
            />

            {/* ---------------- MOBILE TEAM ---------------- */}

            <section className="sm:hidden relative z-10 w-full flex flex-col items-center pt-32 pb-40 gap-24">

                {teamData.team.map((member) => (

                    <motion.div
                        key={member.id}
                        className="relative w-[82vw] max-w-85 aspect-3/4 bg-[#F9EAE8] shadow-2xl rounded-sm overflow-hidden"
                        whileHover={{ y: -5 }}
                    >

                        <div className="absolute -top-8 -left-4 text-[8rem] font-black text-[#5e2f0d]/5 select-none">
                            {member.id}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 top-12 flex justify-center items-end">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-[90%] h-[90%] object-contain object-bottom drop-shadow-xl"
                            />
                        </div>

                        <div className="absolute top-5 left-5 flex flex-col">
                            <span className="text-[10px] font-black tracking-[0.3em] text-rose-600">
                                ROLE // {member.id}
                            </span>

                            <span className="text-sm font-bold tracking-widest text-slate-900 uppercase">
                                {member.role}
                            </span>

                            <span className="text-[10px] font-medium tracking-widest text-slate-500">
                                {member.jp}
                            </span>
                        </div>

                        <div className="absolute top-8 right-6 bottom-8 flex justify-end">
                            <h3
                                className="text-4xl font-bold tracking-[0.15em] text-slate-900"
                                style={{
                                    writingMode: "vertical-rl",
                                    fontFamily: "Akumaru, serif",
                                    WebkitTextStroke: "2px #F9EAE8",
                                    paintOrder: "stroke fill",
                                }}
                            >
                                {member.name}
                            </h3>
                        </div>

                        <div className="absolute bottom-8 left-6 flex flex-col gap-3">
                            {[Github, Linkedin, Twitter].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-9 h-9 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>

                    </motion.div>
                ))}

            </section>

            {/* ---------------- DESKTOP GRID ---------------- */}

            <section className="hidden sm:flex relative z-10 w-full -my-96! px-4 sm:px-6 md:px-8 justify-center">

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-2 lg:gap-x-2 gap-y-12 lg:gap-y-20 place-items-center w-[80vw] scale-50 max-w-350 z-80 photo-grid"
                >

                    {teamData.team.map((member) => (

                        <motion.div
                            key={member.id}
                            className="relative w-full max-w-[320px] sm:max-w-90 aspect-3/4 bg-[#F9EAE8] shadow-2xl rounded-sm overflow-hidden cursor-pointer group"
                            whileHover="hover"
                            initial="initial"
                            variants={{
                                initial: { y: 0 },
                                hover: { y: -10 },
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >

                            {/* DESKTOP CARD CONTENT (UNCHANGED) */}

                            <div className="absolute -top-6 -left-4 sm:-top-10 sm:-left-6 text-[8rem] sm:text-[12rem] font-black text-[#5e2f0d]/5 select-none pointer-events-none leading-none z-0">
                                {member.id}
                            </div>

                            <motion.div
                                className="absolute top-8 right-8 sm:top-12 sm:right-12 w-32 h-32 sm:w-48 sm:h-48 bg-rose-400/80 rounded-full blur-[3px] z-0"
                                variants={{
                                    initial: { scale: 1, opacity: 0.15 },
                                    hover: { scale: 1.2, opacity: 0.3 },
                                }}
                                transition={{ duration: 0.5 }}
                            />

                            <motion.div
                                className="absolute inset-x-0 bottom-0 top-10 z-10 flex justify-center items-end"
                                variants={{
                                    initial: { scale: 1, y: 10 },
                                    hover: { scale: 1.05, y: 0 },
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-[90%] h-[90%] sm:w-full sm:h-full object-contain object-bottom drop-shadow-xl"
                                />
                            </motion.div>

                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-col">
                                <span className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] text-rose-600 mb-1 drop-shadow-sm">
                                    ROLE // {member.id}
                                </span>

                                <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase">
                                    {member.role}
                                </span>

                                <span className="text-[8px] sm:text-[10px] font-medium tracking-widest text-slate-500 mt-1">
                                    {member.jp}
                                </span>
                            </div>

                            <div className="absolute top-6 right-4 sm:top-8 sm:right-6 bottom-6 sm:bottom-8 z-30 pointer-events-none flex justify-end">
                                <h3
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest sm:tracking-[0.15em] text-slate-900"
                                    style={{
                                        writingMode: "vertical-rl",
                                        fontFamily: "Akumaru, serif",
                                        WebkitTextStroke: "2px #F9EAE8",
                                        paintOrder: "stroke fill",
                                    }}
                                >
                                    {member.name}
                                </h3>
                            </div>

                            <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 border-2 border-rose-500 text-rose-600 flex items-center justify-center rounded-sm opacity-60 rotate-15">
                                <span
                                    className="text-[10px] sm:text-xs font-bold"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    印
                                </span>
                            </div>

                            <motion.div
                                className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 z-30 flex flex-col gap-3 sm:gap-4"
                                variants={{
                                    initial: { opacity: 0, x: -20 },
                                    hover: { opacity: 1, x: 0 },
                                }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {[Github, Linkedin, Twitter].map(
                                    (Icon, idx) => (
                                        <a
                                            key={idx}
                                            href="#"
                                            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:text-rose-600 hover:scale-110 transition-all"
                                        >
                                            <Icon size={16} className="sm:w-4.5 sm:h-4.5" />
                                        </a>
                                    ),
                                )}
                            </motion.div>

                        </motion.div>
                        
                    ))}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`dummy-${i}`} className="w-full max-w-[320px] sm:max-w-90 aspect-3/1 opacity-0 pointer-events-none" />
                    ))}

                </div>

            </section>

        </section>
    );
};

export default TeamPage;