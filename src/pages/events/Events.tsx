import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import handleTop from "../../assets/events/scroll-handle-top.png";
import handleBottom from "../../assets/events/scroll-handle-bottom.png";
import paperTexture from "../../assets/events/scroll-paper.png";
import cloud1 from "../../assets/events/cloud1.png";
import cloud2 from "../../assets/events/cloud2.png";

gsap.registerPlugin(ScrollTrigger);

interface EventScrollProps {
    title: any;
    index: number;
}

const EventScroll = ({ title, index }: EventScrollProps) => {
    return (
        <div
            className="scroll-container relative flex flex-col items-center w-64 opacity-0 origin-top"
            data-index={index}
        >
            <img
                src={handleTop}
                alt="Scroll Top"
                className="w-full z-20 relative drop-shadow-xl select-none"
            />

            <div
                className="scroll-body relative w-[86%] z-10 overflow-hidden flex flex-col items-center -mt-4"
                style={{
                    backgroundImage: `url(${paperTexture})`,
                    backgroundSize: "100% 100%",
                    height: "0px",
                }}
            >
                <div className="flex flex-col items-center justify-center h-full w-full px-4 pt-6 pb-2 space-y-6">
                    <h3
                        className="text-3xl text-[#2A1B1B] text-center leading-[1.1] tracking-wide"
                        style={{ fontFamily: "Akumaru, serif" }}
                    >
                        {title}
                    </h3>

                    <button className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-[#d4af37] opacity-20 blur-sm rounded-full transform scale-x-125 scale-y-75 group-hover:opacity-40 transition-opacity duration-300"></div>

                        <span className="relative z-10 text-[#5e2f0d] text-sm font-bold font-serif tracking-widest border-b border-[#5e2f0d]/30 pb-0.5 group-hover:border-[#5e2f0d] transition-colors">
                            View Details
                        </span>
                    </button>
                </div>
            </div>

            <img
                src={handleBottom}
                alt="Scroll Bottom"
                className="scroll-bottom w-full z-20 relative -mt-4 drop-shadow-xl select-none"
            />
        </div>
    );
};

const Events = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cloudRef1 = useRef<HTMLImageElement>(null);
    const cloudRef2 = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            const scrolls =
                gsap.utils.toArray<HTMLElement>(".scroll-container");

            const startSwaying = () => {
                scrolls.forEach((scroll, i) => {
                    const randomDuration = 3 + Math.random() * 1.5;
                    const randomAngle = 2 + Math.random() * 2;

                    gsap.to(scroll, {
                        rotation: randomAngle,
                        duration: randomDuration,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: i * 0.1,
                    });

                    gsap.to(scroll, {
                        rotation: -randomAngle,
                        duration: randomDuration,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: i * 0.1 + randomDuration,
                    });
                });
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
                onComplete: startSwaying,
            });

            tl.to(scrolls, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });

            tl.to(
                ".scroll-body",
                {
                    height: "240px",
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.2,
                },
                "-=0.3",
            );

            gsap.fromTo(
                cloudRef1.current,
                { x: "-200px" },
                {
                    x: "110vw",
                    duration: 40,
                    ease: "none",
                    repeat: -1,
                },
            );

            gsap.fromTo(
                cloudRef2.current,
                { x: "110vw" },
                {
                    x: "-200px",
                    duration: 50,
                    ease: "none",
                    repeat: -1,
                },
            );
        },
        { scope: containerRef },
    );

    const eventList = [
        {
            title: (
                <>
                    PITCH
                    <br />
                    CAFE
                    <br />
                    EVENT
                </>
            ),
        },
        {
            title: (
                <>
                    HACK
                    <br />
                    ATHON
                    <br />
                    FINALS
                </>
            ),
        },
        {
            title: (
                <>
                    SPEAKER
                    <br />
                    SESSIONS
                    <br />
                    LIVE
                </>
            ),
        },
        {
            title: (
                <>
                    NET
                    <br />
                    WORKING
                    <br />
                    DINNER
                </>
            ),
        },
    ];

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center py-20 bg-[#fff5ee] relative overflow-hidden"
        >
            <img
                ref={cloudRef1}
                src={cloud1}
                alt="Cloud 1"
                className="absolute top-[10%] left-0 w-[300px] md:w-[500px] opacity-80 pointer-events-none z-1"
            />

            <img
                ref={cloudRef2}
                src={cloud2}
                alt="Cloud 2"
                className="absolute bottom-[15%] right-0 w-[350px] md:w-[600px] opacity-70 pointer-events-none z-1"
            />

            <div className="text-center mb-12 relative z-10">
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    EVENTS
                </h2>
            </div>

            <div className="container mx-auto px-4 flex flex-wrap justify-center items-start gap-8 md:gap-10 relative z-10">
                {eventList.map((event, index) => (
                    <EventScroll
                        key={index}
                        index={index}
                        title={event.title}
                    />
                ))}
            </div>
        </section>
    );
};

export default Events;
