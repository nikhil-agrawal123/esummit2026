


// IGNORE RIGHT NOW




import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
    progress: number;
}

function Petal({ style }: { style: React.CSSProperties }) {
    return (
        <svg
            viewBox="0 0 20 24"
            style={{ position: "absolute", width: 13, height: 17, ...style }}
            fill="none"
        >
            <ellipse cx="10" cy="12" rx="7" ry="11"
                fill="rgba(255,130,165,0.75)" transform="rotate(-15 10 12)" />
            <ellipse cx="10" cy="12" rx="3" ry="8"
                fill="rgba(255,195,210,0.35)" transform="rotate(-15 10 12)" />
        </svg>
    );
}

export default function Loader({ progress }: LoaderProps) {
    const containerRef   = useRef<HTMLDivElement>(null);
    const strokeRefs     = useRef<(SVGPathElement | null)[]>([]);
    const kanjiRefs      = useRef<(HTMLDivElement | null)[]>([]);
    const petalRefs      = useRef<(HTMLDivElement | null)[]>([]);
    const progressFill   = useRef<HTMLDivElement>(null);
    const progressGlow   = useRef<HTMLDivElement>(null);
    const titleRef       = useRef<HTMLDivElement>(null);
    const circleRef      = useRef<SVGCircleElement>(null);
    const percentRef     = useRef<HTMLDivElement>(null);
    const splatRefs      = useRef<(HTMLDivElement | null)[]>([]);

    /* ── mount animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(containerRef.current,
                { opacity: 0 }, { opacity: 1, duration: 0.55, ease: "power2.out" });

            /* brush strokes draw in */
            strokeRefs.current.forEach((p, i) => {
                if (!p) return;
                const len = p.getTotalLength?.() || 900;
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
                gsap.to(p, {
                    strokeDashoffset: 0, opacity: 1,
                    duration: 1.1 + i * 0.18,
                    delay: 0.05 + i * 0.15,
                    ease: "power3.inOut",
                });
            });

            /* kanji ink-drop reveal */
            kanjiRefs.current.forEach((el, i) => {
                if (!el) return;
                const targetOp = i < 2 ? 0.065 : 0.04;
                gsap.fromTo(el,
                    { opacity: 0, scale: 1.9, filter: "blur(10px)" },
                    { opacity: targetOp, scale: 1, filter: "blur(0px)",
                      duration: 1.5, delay: 0.25 + i * 0.2, ease: "expo.out" });
                gsap.to(el, {
                    y: -7 + Math.random() * 14,
                    duration: 3 + Math.random() * 2.5,
                    ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.25,
                });
            });

            /* ink splatters pop in */
            splatRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.7, delay: 0.4 + i * 0.12, ease: "back.out(1.5)" });
                gsap.to(el, {
                    scale: 1.08, duration: 2.2 + i * 0.3,
                    ease: "sine.inOut", yoyo: true, repeat: -1,
                });
            });

            /* title */
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 18, filter: "blur(5px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, delay: 0.55, ease: "power3.out" });

            /* circle */
            gsap.fromTo(circleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.45 });

            /* petals */
            petalRefs.current.forEach((el, _i) => {
                if (!el) return;
                const sl = 5 + Math.random() * 90;
                const drift = (Math.random() - 0.5) * 150;
                const dur = 5 + Math.random() * 4;
                const delay = Math.random() * 5;
                gsap.set(el, { left: `${sl}%`, top: "-4%", rotation: Math.random() * 360, opacity: 0 });
                gsap.to(el, {
                    top: "108%", left: `+=${drift}`,
                    rotation: `+=${180 + Math.random() * 180}`,
                    opacity: 0.92, duration: dur, delay,
                    ease: "none", repeat: -1, repeatDelay: Math.random() * 4,
                    onRepeat() {
                        gsap.set(el, { left: `${5 + Math.random() * 90}%`, top: "-4%", opacity: 0 });
                    },
                });
                gsap.to(el, { opacity: 0.92, duration: 0.5, delay: delay + 0.3 });
            });
        });
        return () => ctx.revert();
    }, []);

    /* ── progress updates ── */
    useEffect(() => {
        if (progressFill.current)
            gsap.to(progressFill.current, { width: `${progress}%`, duration: 0.35, ease: "power1.out" });
        if (progressGlow.current)
            gsap.to(progressGlow.current, { width: `${progress}%`, duration: 0.35, ease: "power1.out" });

        if (percentRef.current) {
            const obj = { val: parseFloat(percentRef.current.dataset.val || "0") };
            gsap.to(obj, {
                val: progress, duration: 0.35, ease: "power1.out",
                onUpdate() {
                    if (percentRef.current) {
                        percentRef.current.textContent = Math.floor(obj.val).toString();
                        percentRef.current.dataset.val = obj.val.toString();
                    }
                },
            });
        }

        if (circleRef.current) {
            const circ = 2 * Math.PI * 52;
            gsap.to(circleRef.current, {
                strokeDashoffset: circ - (progress / 100) * circ,
                duration: 0.38, ease: "power1.out",
            });
        }
    }, [progress]);

    const petals       = Array.from({ length: 22 });
    const circ         = 2 * Math.PI * 52;

    const bgKanji = [
        { char: "頂", top: "7%",  left: "4%",   size: "9.5rem" },
        { char: "魂", top: "5%",  right: "6%",  size: "8rem"   },
        { char: "炎", bottom: "9%",  left: "7%",  size: "8.5rem" },
        { char: "道", bottom: "7%",  right: "4%", size: "9rem"   },
        { char: "志", top: "44%", left: "1.5%", size: "5.5rem" },
        { char: "力", top: "40%", right: "2%",  size: "6rem"   },
        { char: "峰", top: "21%", left: "17%",  size: "4rem"   },
    ];

    const splatters = [
        { top: "9%",    left: "7%",   w: 80,  h: 60,  color: "rgba(160,5,30,0.22)"  },
        { top: "14%",   right: "9%",  w: 55,  h: 45,  color: "rgba(210,30,70,0.16)" },
        { bottom:"11%", left: "9%",   w: 100, h: 70,  color: "rgba(140,0,25,0.18)"  },
        { bottom:"16%", right: "7%",  w: 65,  h: 50,  color: "rgba(190,20,55,0.14)" },
        { top: "43%",   left: "2%",   w: 45,  h: 40,  color: "rgba(170,5,35,0.13)"  },
        { top: "37%",   right: "3%",  w: 60,  h: 50,  color: "rgba(210,50,90,0.12)" },
    ];

    return (
        <div ref={containerRef}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0b0507" }}>

            {/* ── fonts + CSS ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@800&family=Zen+Old+Mincho:wght@900&family=Cinzel:wght@700&display=swap');

                .ldr-kanji {
                    font-family: 'Zen Old Mincho', serif;
                    font-weight: 900;
                    color: #fff;
                    position: absolute;
                    pointer-events: none;
                    user-select: none;
                    line-height: 1;
                }
                .ldr-title {
                    font-family: 'Cinzel', serif;
                    font-weight: 700;
                    letter-spacing: 0.24em;
                    background: linear-gradient(135deg, #ff3060 0%, #ffffff 45%, #ff7090 80%, #e01040 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 20px rgba(220,10,50,0.6));
                }
                .ldr-year {
                    font-family: 'Shippori Mincho B1', serif;
                    font-weight: 800;
                    color: rgba(255,90,120,0.85);
                    letter-spacing: 0.1em;
                    text-shadow: 0 0 18px rgba(220,10,50,0.55);
                }
                .ldr-pct {
                    font-family: 'Shippori Mincho B1', serif;
                    font-weight: 800;
                    background: linear-gradient(180deg, #ffffff 0%, #ff5577 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 12px rgba(220,10,50,0.8));
                    font-size: 2.7rem;
                    line-height: 1;
                }
                .ldr-sub {
                    font-family: 'Zen Old Mincho', serif;
                    font-size: 0.52rem;
                    letter-spacing: 0.5em;
                    color: rgba(255,130,155,0.65);
                    margin-top: 3px;
                }
                .ldr-label {
                    font-family: 'Zen Old Mincho', serif;
                    letter-spacing: 0.55em;
                    color: rgba(255,140,165,0.5);
                    text-transform: uppercase;
                    font-size: 0.58rem;
                }
                .ldr-splat {
                    position: absolute;
                    border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
                    filter: blur(26px);
                    pointer-events: none;
                }
                .ldr-track {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(200,10,40,0.22);
                    border-radius: 999px;
                    overflow: hidden;
                    position: relative;
                }
                .ldr-fill {
                    height: 100%;
                    border-radius: 999px;
                    background: linear-gradient(90deg, #6b0018 0%, #b80030 35%, #e81045 65%, #ff5577 100%);
                    box-shadow: 0 0 16px rgba(220,10,50,0.75), 0 0 36px rgba(160,0,30,0.4);
                    position: relative;
                    overflow: hidden;
                }
                .ldr-shimmer {
                    position: absolute; top: 0; bottom: 0; width: 35%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: ldr-sweep 2.2s infinite ease-in-out;
                }
                @keyframes ldr-sweep {
                    0%   { transform: translateX(-120%); }
                    100% { transform: translateX(420%);  }
                }
                .ldr-glow {
                    position: absolute; top: 0; left: 0; height: 100%;
                    border-radius: 999px;
                    background: linear-gradient(90deg, transparent, rgba(255,100,130,0.45));
                    filter: blur(5px);
                }
                .brush-svg { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
            `}</style>

            {/* Ambient red glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: [
                    "radial-gradient(ellipse 52% 42% at 50% 50%, rgba(120,0,25,0.2) 0%, transparent 70%)",
                    "radial-gradient(ellipse 28% 45% at 18% 82%, rgba(90,0,18,0.14) 0%, transparent 65%)",
                    "radial-gradient(ellipse 22% 28% at 82% 18%, rgba(160,10,45,0.12) 0%, transparent 65%)",
                ].join(","),
            }} />

            {/* Ink splatters */}
            {splatters.map((s, i) => (
                <div key={i} ref={el => { splatRefs.current[i] = el; }} className="ldr-splat"
                    style={{
                        top: (s as any).top, bottom: (s as any).bottom,
                        left: (s as any).left, right: (s as any).right,
                        width: s.w, height: s.h, background: s.color,
                    }} />
            ))}

            {/* Background kanji */}
            {bgKanji.map((k, i) => (
                <div key={i} ref={el => { kanjiRefs.current[i] = el; }} className="ldr-kanji"
                    style={{
                        top: (k as any).top, bottom: (k as any).bottom,
                        left: (k as any).left, right: (k as any).right,
                        fontSize: k.size, opacity: 0,
                    }}>
                    {k.char}
                </div>
            ))}

            {/* Brush stroke SVG */}
            <svg className="brush-svg" viewBox="0 0 900 600" preserveAspectRatio="none">
                <defs>
                    <filter id="ink"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="4" /></filter>
                </defs>
                {/* Top sweep — thick */}
                <path ref={el => { strokeRefs.current[0] = el; }}
                    d="M-15,48 C80,14 220,55 420,32 C580,14 740,48 960,22"
                    stroke="rgba(170,8,35,0.4)" strokeWidth="32" fill="none"
                    strokeLinecap="round" filter="url(#ink)" style={{ filter: "blur(1px)" }} />
                {/* Top sweep — thin accent */}
                <path ref={el => { strokeRefs.current[1] = el; }}
                    d="M-15,60 C100,35 260,68 440,46 C610,28 770,60 960,38"
                    stroke="rgba(230,30,70,0.18)" strokeWidth="6" fill="none" strokeLinecap="round" />
                {/* Bottom sweep */}
                <path ref={el => { strokeRefs.current[2] = el; }}
                    d="M-15,548 C120,516 300,558 500,536 C670,516 810,555 960,530"
                    stroke="rgba(170,8,35,0.35)" strokeWidth="28" fill="none"
                    strokeLinecap="round" style={{ filter: "blur(1.2px)" }} />
                {/* Right diagonal drip */}
                <path ref={el => { strokeRefs.current[3] = el; }}
                    d="M750,0 C790,90 760,200 800,310 C830,400 800,490 820,580"
                    stroke="rgba(210,20,55,0.13)" strokeWidth="48" fill="none"
                    strokeLinecap="round" style={{ filter: "blur(4px)" }} />
                {/* Left vertical brush */}
                <path
                    d="M55,80 C25,220 65,370 40,510"
                    stroke="rgba(180,10,40,0.09)" strokeWidth="38" fill="none"
                    strokeLinecap="round" style={{ filter: "blur(3px)" }} />
                {/* Centre thin diagonal */}
                <path
                    d="M300,580 C400,420 480,250 560,80"
                    stroke="rgba(200,20,60,0.06)" strokeWidth="18" fill="none"
                    strokeLinecap="round" style={{ filter: "blur(2px)" }} />
            </svg>

            {/* Falling petals */}
            {petals.map((_, i) => (
                <div key={i} ref={el => { petalRefs.current[i] = el; }} style={{ position: "absolute" }}>
                    <Petal style={{}} />
                </div>
            ))}

            {/* ─── CORE UI ─── */}
            <div className="relative flex flex-col items-center gap-5 z-10">

                {/* Title */}
                <div ref={titleRef} className="flex flex-col items-center gap-1">
                    <div className="ldr-title text-[1.9rem]">E Summit</div>
                    <div style={{
                        width: 160,
                        height: 1,
                        background: "linear-gradient(90deg, transparent, rgba(210,20,55,0.7), transparent)",
                        margin: "3px auto",
                    }} />
                    <div className="ldr-year text-sm">'26</div>
                </div>

                {/* Circle progress */}
                <div className="relative flex items-center justify-center" style={{ width: 144, height: 144 }}>
                    {/* Dark ink pool */}
                    <div style={{
                        position: "absolute", inset: 10, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(80,0,15,0.6) 0%, rgba(18,3,7,0.88) 70%)",
                        boxShadow: "inset 0 0 28px rgba(0,0,0,0.85)",
                    }} />

                    <svg width="144" height="144" viewBox="0 0 144 144">
                        {/* Track ring */}
                        <circle cx="72" cy="72" r="52" fill="none"
                            stroke="rgba(200,10,40,0.14)" strokeWidth="5" />
                        {/* Tick marks */}
                        {Array.from({ length: 16 }).map((_, i) => {
                            const ang = (i / 16) * 360;
                            const r = (ang - 90) * (Math.PI / 180);
                            const major = i % 4 === 0;
                            return (
                                <line key={i}
                                    x1={72 + (major ? 63 : 61) * Math.cos(r)}
                                    y1={72 + (major ? 63 : 61) * Math.sin(r)}
                                    x2={72 + 55 * Math.cos(r)}
                                    y2={72 + 55 * Math.sin(r)}
                                    stroke={major ? "rgba(220,30,65,0.45)" : "rgba(220,30,65,0.2)"}
                                    strokeWidth={major ? 2 : 1}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                        {/* Progress arc */}
                        <circle ref={circleRef}
                            cx="72" cy="72" r="52" fill="none"
                            stroke="url(#cg)" strokeWidth="4.5" strokeLinecap="round"
                            strokeDasharray={circ} strokeDashoffset={circ}
                            transform="rotate(-90 72 72)"
                            style={{ filter: "drop-shadow(0 0 7px rgba(255,40,80,0.9))" }}
                        />
                        <defs>
                            <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#7a0018" />
                                <stop offset="50%"  stopColor="#d01038" />
                                <stop offset="100%" stopColor="#ff5577" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Percentage */}
                    <div className="absolute flex flex-col items-center justify-center">
                        <div ref={percentRef} className="ldr-pct" data-val="0">
                            {Math.floor(progress)}
                        </div>
                        <div className="ldr-sub">読込中</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="ldr-track" style={{ width: 255, height: 5 }}>
                    <div ref={progressFill} className="ldr-fill" style={{ width: `${progress}%` }}>
                        <div className="ldr-shimmer" />
                    </div>
                    <div ref={progressGlow} className="ldr-glow" style={{ width: `${progress}%` }} />
                </div>

                {/* Label */}
                <div className="ldr-label">読み込み中 · Loading</div>
            </div>

            {/* Bottom ink wash edge */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 55 }}>
                <svg viewBox="0 0 900 55" style={{ width: "100%", height: "100%" }}>
                    <path d="M0,35 Q180,8 400,28 Q620,48 900,18 L900,55 L0,55 Z"
                        fill="rgba(140,5,25,0.18)" />
                    <path d="M0,45 Q220,22 450,38 Q680,54 900,30 L900,55 L0,55 Z"
                        fill="rgba(100,0,18,0.14)" />
                </svg>
            </div>
        </div>
    );
}