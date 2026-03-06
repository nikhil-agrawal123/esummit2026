import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
            // Set initial transform state to prevent shift on reload
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

    return (
        <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden">
            {/* Glass Back Button */}
            <div
                onClick={()=>{startTransition("/")}}
                className="fixed w-45 top-6 left-12 z-9997 flex items-center gap-2 px-4 py-2 overflow-hidden scale-150 cursor-pointer"
            >
                <img
                    src={passBrushstroke}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <div className="content flex items-center justify-center gap-2 mx-6!">
                    <ArrowLeft size={18} className="text-[#9c4308] relative z-10" />
                    <span className="font-semibold tracking-wide relative z-10 font-['Akumaru'] text-[25px] text-[#9c4308]"
                        // style={
                        //      { textShadow: "-1px -1px 0 #452007, 1px -1px 0 #452007, -1px 1px 0 #452007, 1px 1px 0 #452007"}
                        // }
                    >Home</span>
                </div>
            </div>

            {/* LAYER 0: Fixed Main Background */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${bgMain})` }}
            />

            {/* LAYER 1: The Pinned Hero Sequence */}
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

            <img
                src={bgLeft}
                alt="Left Mountain"
                className="fixed left-mountain top-96 left-0 z-9997 w-auto max-w-[50vw] max-h-[50vh] object-contain object-bottom"
            />

            <img
                src={bgRight}
                alt="Right Mountain"
                className="fixed right-mountain top-96 -right-5 z-9997 w-auto max-w-[50vw] max-h-[50vh] object-contain object-bottom"
            />

            {/* LAYER 2: The Scrollable Team Grid */}
            <section className="relative z-10 w-full -my-96! px-4 sm:px-6 md:px-8 flex justify-center">
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-2 lg:gap-x-2 gap-y-12 lg:gap-y-20 place-items-center w-[80vw] scale-50 max-w-[1400px]"
                >
                    {teamData.team.map((member) => (
                        <motion.div
                            key={member.id}
                            className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] bg-[#F9EAE8] shadow-2xl rounded-sm overflow-hidden cursor-pointer group"
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
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-slate-900"
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

                            <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 border-2 border-rose-500 text-rose-600 flex items-center justify-center rounded-sm opacity-60 rotate-[15deg]">
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
                                            <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        </a>
                                    ),
                                )}
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-tr from-transparent via-white/40 to-transparent w-[200%] h-[200%] -top-[50%] -left-[50%] rotate-45"
                                variants={{
                                    initial: { x: "-100%" },
                                    hover: { x: "100%" },
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    ))}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`dummy-${i}`} className="w-full max-w-[320px] sm:max-w-[360px] aspect-[3/1] opacity-0 pointer-events-none" />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default TeamPage;