import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import buttonTexture from "../assets/events/back.webp";
import EventScroll from "../components/EventScroll/EventScroll";
import eventsData from "../data/events.json";


interface eventsProps {
    startTransition: (targetRoute: string) => void;
}

const Events = ({ startTransition }: eventsProps) => {
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
        },
        { scope: containerRef },
    );

    return (
        <section
            id="events"
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative overflow-hidden bg-transparent"
        >
            <div className="text-center mb-16 md:mb-28 relative z-30">
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    EVENTS
                </h2>
            </div>

            <div className="container mx-auto px-4 flex flex-col md:flex-row md:flex-wrap justify-center items-center md:items-start gap-y-20 md:gap-y-24 md:gap-x-12 relative z-30">
                {eventList.map((event, index) => (
                    <EventScroll key={event.id} index={index} event={event} />
                ))}
            </div>

            <div className="cursor-pointer w-full mt-40 md:mt-56 relative z-30 flex items-center justify-center" onClick={()=>{startTransition("/all-events")}}>
                <img
                    src={buttonTexture}
                    alt="Texture"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 md:w-95 max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span
                    className="relative z-10 px-12 py-6 text-3xl md:text-4xl text-[#5e2f0d] drop-shadow-md font-bold tracking-wider group-hover:text-[#2A1B1B] transition-colors"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    All Events
                </span>
            </div>
        </section>
    );
};

export default Events;