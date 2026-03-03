import { useRef, useEffect } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

import { motion } from "framer-motion";

import { Github, Linkedin, Twitter } from "lucide-react";

import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Replace these with your actual E-Summit assets

import bgMain from "../assets/team/background.png";

import bgLeft from "../assets/team/left-bg.png";

import bgRight from "../assets/team/right-bg.png";

import toriGate from "../assets/team/tori-gate.png";

// Import your new character transparent PNGs

import u1 from "../assets/team/u1.png";

import u2 from "../assets/team/u2.png";

import p1 from "../assets/team/members/1.png";

import p2 from "../assets/team/members/2.png";

import p3 from "../assets/team/members/3.png";

import p4 from "../assets/team/members/4.png";

import p5 from "../assets/team/members/5.png";

import p6 from "../assets/team/members/6.png";

import p7 from "../assets/team/members/7.png";

import p8 from "../assets/team/members/8.png";

import p9 from "../assets/team/members/9.png";

import p10 from "../assets/team/members/10.png";

import p11 from "../assets/team/members/11.png";

import p12 from "../assets/team/members/12.png";

import p13 from "../assets/team/members/13.png";

import p14 from "../assets/team/members/14.png";

import p15 from "../assets/team/members/15.png";

import p16 from "../assets/team/members/16.png";

import p17 from "../assets/team/members/17.png";

import p18 from "../assets/team/members/18.png";

import p19 from "../assets/team/members/19.png";

import p20 from "../assets/team/members/20.png";

import p21 from "../assets/team/members/21.png";

import p22 from "../assets/team/members/22.png";

import p23 from "../assets/team/members/23.png";

import p24 from "../assets/team/members/24.png";

import p25 from "../assets/team/members/25.png";

// Alternating images applied directly to the data array

const teamData = [
    {
        id: "01",

        name: "Praddume Attri",

        role: "Convenors",

        jp: "フロントエンド",

        image: p10,
    },

    {
        id: "02",

        name: "Aryan Raj",

        role: "Convenors",

        jp: "デザイナー",

        image: p25,
    },

    {
        id: "03",

        name: "Yuvraj Verma",

        role: "General Secretary",

        jp: "バックエンド",

        image: p22,
    },

    {
        id: "04",

        name: "Vikas Meena",

        role: "Treasurer",

        jp: "ディレクター",

        image: p8,
    },

    {
        id: "05",

        name: "Aatiq",

        role: "Design OCs",

        jp: "オペレーション",

        image: p11,
    },

    {
        id: "06",

        name: "Sumeet",

        role: "Design OCs",

        jp: "オペレーション",

        image: p1,
    },

    {
        id: "07",

        name: "Farhaan",

        role: "Design OCs",

        jp: "オペレーション",

        image: p21,
    },

    {
        id: "08",

        name: "Garu Jain",

        role: "Spons Core",

        jp: "マーケティング",

        image: p14,
    },

    {
        id: "09",

        name: "Prerak Tanwar",

        role: "Spons Core",

        jp: "マーケティング",

        image: p16,
    },

    {
        id: "10",

        name: "Saksham",

        role: "Spons Core",

        jp: "マーケティング",

        image: p17,
    },

    {
        id: "11",

        name: "Parth",

        role: "Spons Core",

        jp: "マーケティング",

        image: p3,
    },

    {
        id: "12",

        name: "Sumit",

        role: "Operations OC",

        jp: "マーケティング",

        image: p4,
    },

    {
        id: "13",

        name: "Abhimanyu",

        role: "Operations OC",

        jp: "マーケティング",

        image: p12,
    },

    {
        id: "14",

        name: "Adwait",

        role: "PR And Outreach",

        jp: "マーケティング",

        image: p24,
    },

    {
        id: "15",

        name: "Yashaswi",

        role: "PR And Outreach",

        jp: "マーケティング",

        image: p15,
    },

    {
        id: "16",

        name: "Kirat",

        role: "PR And Outreach",

        jp: "マーケティング",

        image: p23,
    },

    {
        id: "17",

        name: "Areeb",

        role: "Webdev OC",

        jp: "マーケティング",

        image: p7,
    },

    {
        id: "18",

        name: "Shubhi",

        role: "Ambience OC",

        jp: "マーケティング",

        image: p19,
    },

    {
        id: "19",

        name: "Pranshu",

        role: "Ambience OC",

        jp: "マーケティング",

        image: p13,
    },

    {
        id: "20",

        name: "Nikhil",

        role: "Curations OC",

        jp: "マーケティング",

        image: p2,
    },

    {
        id: "21",

        name: "Lakshay",

        role: "Curations OC",

        jp: "マーケティング",

        image: p5,
    },

    {
        id: "22",

        name: "Navya",

        role: "Curations OC",

        jp: "マーケティング",

        image: p9,
    },

    {
        id: "23",

        name: "Anurag",

        role: "Spons Core",

        jp: "マーケティング",

        image: p18,
    },

    {
        id: "24",

        name: "Pratham",

        role: "Spons Core",

        jp: "マーケティング",

        image: p6,
    },

    {
        id: "25",

        name: "Rahul",

        role: "Spons Core",

        jp: "マーケティング",

        image: p20,
    },
];

const TeamPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    // Initialize Lenis for premium smooth scrolling

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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,

                    start: "top top",

                    end: "+=200%",

                    pin: true,

                    scrub: 1,

                    pinSpacing: false,
                },
            });

            tl.to(".team-text", { scale: 2, opacity: 0, duration: 0.3 }, 0);

            tl.to(
                ".left-mountain",

                { xPercent: -20, opacity: 0.8, duration: 0.6 },

                0,
            );

            tl.to(
                ".right-mountain",

                { xPercent: 20, opacity: 0.8, duration: 0.6 },

                0,
            );

            tl.to(
                ".tori-gate",

                {
                    scale: 35,

                    transformOrigin: "50% 65%",

                    ease: "power2.inOut",

                    duration: 1,
                },

                0,
            );

            tl.to(".tori-gate", { opacity: 0, duration: 0.1 }, 0.9);
        },

        { scope: heroRef },
    );

    return (
        <div className="relative w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden">
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
                    src={bgLeft}
                    alt="Left Mountain"
                    className="left-mountain absolute bottom-0 left-0 w-auto max-h-[50vh] object-contain object-bottom"
                />

                <img
                    src={bgRight}
                    alt="Right Mountain"
                    className="right-mountain absolute bottom-0 right-0 w-auto max-h-[50vh] object-contain object-bottom"
                />

                <img
                    src={toriGate}
                    alt="Tori Gate"
                    className="tori-gate absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-h-[85vh] object-contain object-bottom"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                        className="team-text text-5xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] select-none tracking-widest"
                        style={{ fontFamily: "Akumaru, serif", y: -50 }}
                    >
                        OUR TEAM
                    </h2>
                </div>
            </section>

            {/* LAYER 2: The Scrollable Team Grid */}

            {/* CRITICAL FIX: flex justify-center ensures the inner grid stays perfectly middle-aligned */}

            <section className="relative z-10 w-full pt-[45vh] pb-40 px-4 md:px-8 flex justify-center">
                {/* Max-width applied directly to the grid, avoiding the left-sticking issue */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 place-items-center w-full max-w-[1200px]">
                    {teamData.map((member) => (
                        <motion.div
                            key={member.id}
                            // The Pinkish-Beige Canvas Theme (bg-[#F9EAE8])

                            className="relative w-full max-w-[360px] aspect-[3/4] bg-[#F9EAE8] shadow-2xl rounded-sm overflow-hidden cursor-pointer group"
                            whileHover="hover"
                            initial="initial"
                            variants={{
                                initial: { y: 0 },

                                hover: { y: -15 },
                            }}
                            transition={{
                                type: "spring",

                                stiffness: 300,

                                damping: 20,
                            }}
                        >
                            {/* --- BACKGROUND AESTHETICS --- */}

                            {/* Giant faded ID number in background */}

                            <div className="absolute -top-10 -left-6 text-[12rem] font-black text-[#5e2f0d]/5 select-none pointer-events-none leading-none z-0">
                                {member.id}
                            </div>

                            {/* Softer Rose/Pink Sun Graphic to match the background */}

                            <motion.div
                                className="absolute top-12 right-12 w-48 h-48 bg-rose-400/80 rounded-full blur-[3px] z-0"
                                variants={{
                                    initial: { scale: 1, opacity: 0.15 },

                                    hover: { scale: 1.2, opacity: 0.3 },
                                }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* --- THE CHARACTER IMAGE --- */}

                            {/* Your transparent PNGs mapping directly to the UI */}

                            <motion.div
                                className="absolute inset-x-0 bottom-0 top-10 z-10 flex justify-center items-end"
                                variants={{
                                    initial: { scale: 1, y: 10 },

                                    hover: { scale: 1.08, y: 0 },
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-contain object-bottom drop-shadow-xl"
                                />
                            </motion.div>

                            {/* --- FOREGROUND UI & TYPOGRAPHY --- */}

                            {/* Top Left: Tech/Role Details */}

                            <div className="absolute top-6 left-6 z-20 flex flex-col">
                                <span className="text-[10px] font-black tracking-[0.3em] text-rose-600 mb-1 drop-shadow-sm">
                                    ROLE // {member.id}
                                </span>

                                <span className="text-sm font-bold tracking-widest text-slate-900 uppercase">
                                    {member.role}
                                </span>

                                <span className="text-[10px] font-medium tracking-widest text-slate-500 mt-1">
                                    {member.jp}
                                </span>
                            </div>

                            {/* Right Side: Massive Vertical Name */}

                            {/* Notice WebkitTextStroke matches the new #F9EAE8 canvas color perfectly */}

                            <div className="absolute top-8 right-6 bottom-8 z-30 pointer-events-none flex justify-end">
                                <h3
                                    className="text-4xl md:text-5xl font-bold tracking-[0.15em] text-slate-900"
                                    style={{
                                        writingMode: "vertical-rl",

                                        fontFamily: "Akumaru, serif",

                                        WebkitTextStroke: "3px #F9EAE8",

                                        paintOrder: "stroke fill",
                                    }}
                                >
                                    {member.name}
                                </h3>
                            </div>

                            {/* Stylized Rose Hanko Stamp (Bottom Right) */}

                            <div className="absolute bottom-8 right-6 z-20 w-10 h-10 border-2 border-rose-500 text-rose-600 flex items-center justify-center rounded-sm opacity-60 rotate-[15deg]">
                                <span
                                    className="text-xs font-bold"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    印
                                </span>
                            </div>

                            {/* Bottom Left: Socials (Fades in on Hover) */}

                            <motion.div
                                className="absolute bottom-8 left-6 z-30 flex flex-col gap-4"
                                variants={{
                                    initial: { opacity: 0, x: -20 },

                                    hover: { opacity: 1, x: 0 },
                                }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:text-rose-600 hover:scale-110 transition-all"
                                >
                                    <Github size={18} />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:text-[#0077b5] hover:scale-110 transition-all"
                                >
                                    <Linkedin size={18} />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:text-[#1DA1F2] hover:scale-110 transition-all"
                                >
                                    <Twitter size={18} />
                                </a>
                            </motion.div>

                            {/* Glint/Shine Effect on Hover */}

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
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
