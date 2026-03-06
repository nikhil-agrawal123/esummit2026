import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import passBrushstroke from "../assets/passBrushstroke.webp";
import { ArrowLeft } from "lucide-react";

import eventsBg from "../assets/events/events-bg.png";
import buttonTexture from "../assets/events/back.png";
import EventScroll from "../components/EventScroll/EventScroll";
import eventsData from "../data/events.json";

interface allEventsProps {
    startTransition: (targetRoute: string) => void;
}

const AllEvents = ({ startTransition }: allEventsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const eventList = eventsData.allEvents;

    // Scroll to top on mount
    useEffect(() => {
        // Immediate scroll to top
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useGSAP(
        () => {
            const scrolls =
                gsap.utils.toArray<HTMLElement>(".scroll-container");

            const startIdleAnimations = () => {
                scrolls.forEach((scroll, i) => {
                    const randomDuration = 4 + Math.random() * 2;
                    const randomAngle = 0.5 + Math.random() * 1;

                    gsap.to(scroll, {
                        rotation: randomAngle,
                        duration: randomDuration,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: i * 0.2,
                    });

                    gsap.to(scroll, {
                        rotation: -randomAngle,
                        duration: randomDuration,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: i * 0.2 + randomDuration,
                    });
                });
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
                onComplete: startIdleAnimations,
            });

            tl.to(scrolls, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            tl.to(
                ".scroll-body",
                {
                    height: "280px",
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.15,
                },
                "-=0.3"
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center py-20 relative overflow-hidden"
            style={{
                backgroundImage: `url(${eventsBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
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
            {/* Header */}
            <div className="text-center mb-16 md:mb-24 relative z-30 pt-10">
                <h2
                    className="text-5xl md:text-7xl lg:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    ALL EVENTS
                </h2>
                <p
                    className="mt-4 text-lg md:text-xl text-[#5e2f0d] font-serif tracking-wide opacity-80"
                >
                    Explore everything E-Summit 2026 has to offer
                </p>
            </div>

            {/* Events Grid */}
            <div className="container mx-auto px-4 flex flex-wrap justify-center items-start gap-x-6 lg:gap-x-10 gap-y-20 relative z-30">
                {eventList.map((event, index) => (
                    <EventScroll key={event.id} index={index} event={event} />
                ))}
            </div>

            {/* Back to Home Button */}
            <div className="w-full mt-32 md:mt-40 relative z-30 flex items-center justify-center pb-10">
                <img
                    src={buttonTexture}
                    alt="Texture"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 md:w-[320px] max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span
                    className="relative z-10 px-10 py-5 text-2xl md:text-3xl text-[#5e2f0d] drop-shadow-md font-bold tracking-wider group-hover:text-[#2A1B1B] transition-colors"
                    style={{ fontFamily: "Akumaru, serif" }}
                    onClick={()=>startTransition("/")}
                >
                    Back Home
                </span>
            </div>
        </section>
    );
};

export default AllEvents;
