import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

import eventsBg from "../assets/events/events-bg.png";
import buttonTexture from "../assets/events/back.png";
import EventScroll from "../components/EventScroll/EventScroll";
import eventsData from "../data/events.json";

const Events = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const eventList = eventsData.featuredEvents;

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
                {/* Creative Touch: A giant, faint number in the background */}

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
                    start: "top 60%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
                onComplete: startIdleAnimations,
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
                    height: "280px",
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.2,
                },
                "-=0.3",
            );
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative overflow-hidden"
            style={{ backgroundImage: `url(${eventsBg})` }}
        >
            <div className="text-center mb-16 md:mb-28 relative z-30">
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    EVENTS
                </h2>
            </div>

            <div className="container mx-auto px-4 flex flex-wrap justify-center items-start gap-x-8 lg:gap-x-12 gap-y-24 relative z-30">
                {eventList.map((event, index) => (
                    <EventScroll key={event.id} index={index} event={event} />
                ))}
            </div>

            <div className="w-full mt-40 md:mt-56 relative z-30 flex items-center justify-center">
                <Link
                    to="/all-events"
                    className="relative group inline-flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                    <img
                        src={buttonTexture}
                        alt="Texture"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span
                        className="relative z-10 px-12 py-6 text-3xl md:text-4xl text-[#5e2f0d] drop-shadow-md font-bold tracking-wider group-hover:text-[#2A1B1B] transition-colors"
                        style={{ fontFamily: "Akumaru, serif" }}
                    >
                        All Events
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default Events;
