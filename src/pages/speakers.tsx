import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import eventsBg from "../assets/events/events-bg.png";
import speakersData from "../data/speakers.json";
import left from "../assets/events/window-left-panel.png";
import right from "../assets/events/window-right-panel.png";
import subtracted from "../assets/events/window-subtract.png";
import Marquee from "react-fast-marquee";

interface Speaker {
    name: string;
    title: string;
    company: string;
    img: string;
}

const Speakers = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const speakerCardsRef = useRef<HTMLDivElement[]>([]);
    const doorStateRef = useRef<Map<HTMLElement, boolean>>(new Map());

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [isActive, setIsActive] = useState(false);

    const speakers: Speaker[] = speakersData.allSpeakers;
    const duplicatedSpeakers = [...speakers, ...speakers, ...speakers];

    const addToCardsRef = (el: HTMLDivElement | null) => {
        if (el && !speakerCardsRef.current.includes(el)) {
            speakerCardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isDesktop || !isActive) return;

        const doorState = doorStateRef.current;

        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            });

            const updateDoors = () => {
                if (!marqueeRef.current) return;

                const marqueeRect = marqueeRef.current.getBoundingClientRect();

                speakerCardsRef.current.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();

                    const leftDoor = card.querySelector(".door-left") as HTMLElement;
                    const rightDoor = card.querySelector(".door-right") as HTMLElement;
                    if (!leftDoor || !rightDoor) return;

                    const visibleWidth = Math.max(
                        0,
                        Math.min(cardRect.right, marqueeRect.right) -
                        Math.max(cardRect.left, marqueeRect.left)
                    );

                    const visibilityRatio = visibleWidth / cardRect.width;
                    const isVisible = visibilityRatio > 0.75;

                    const currentlyOpen = doorState.get(card) ?? false;

                    if (isVisible === currentlyOpen) return;

                    doorState.set(card, isVisible);

                    gsap.killTweensOf([leftDoor, rightDoor]);

                    if (isVisible) {
                        gsap.to(leftDoor, {
                            x: -125,
                            duration: 1,
                            delay: index * 0.1,
                            ease: "power3.out",
                        });

                        gsap.to(rightDoor, {
                            x: 122,
                            duration: 1,
                            delay: index * 0.1,
                            ease: "power3.out",
                        });
                    } else {
                        gsap.to([leftDoor, rightDoor], {
                            x: 0,
                            duration: 0.6,
                            ease: "power2.inOut",
                        });
                    }
                });
            };

            gsap.ticker.add(updateDoors);

            return () => {
                gsap.ticker.remove(updateDoors);
                doorState.clear();
            };
        }, containerRef);

        return () => ctx.revert();
    }, [isDesktop, isActive]);

    // Mobile layout - simple scrollable cards
    if (!isDesktop) {
        return (
            <section
                id="speakers"
                ref={containerRef}
                className="min-h-screen w-full flex flex-col items-center justify-center py-24 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${eventsBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div ref={headingRef} className="text-center mb-16 relative z-10">
                    <h2
                        className="text-6xl text-[#2d1b2d] drop-shadow-sm select-none"
                        style={{ fontFamily: "Akumaru, serif" }}
                    >
                        SPEAKERS
                    </h2>
                </div>

                <div className="flex gap-6 overflow-x-auto px-4 pb-4 w-full snap-x snap-mandatory">
                    {speakers.map((speaker, index) => (
                        <div
                            key={index}
                            className="shrink-0 w-70 snap-center relative"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={subtracted}
                                    alt=""
                                    className="w-full h-auto select-none relative z-10 pointer-events-none"
                                />

                                <div className="absolute top-[5%] left-[7%] right-[7%] bottom-[36%] z-0 overflow-hidden">
                                    <img
                                        src={speaker.img}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.opacity = "0";
                                        }}
                                    />
                                </div>

                                <div className="absolute bottom-[8%] left-0 w-full text-center z-40 pointer-events-none px-4">
                                    <p
                                        className="text-lg text-[#2d1b2d] font-bold"
                                        style={{ fontFamily: "Akumaru, serif" }}
                                    >
                                        {speaker.name}
                                    </p>
                                    <p className="text-sm text-[#4a3a4a]">{speaker.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            id="speakers"
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center py-24 relative overflow-hidden"
            style={{
                backgroundImage: `url(/background.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header */}
            <div
                ref={headingRef}
                className="text-center mb-16 md:mb-24 relative z-10"
            >
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    SPEAKERS
                </h2>
            </div>
            <div
                ref={marqueeRef}
                className="w-full max-w-350 mx-auto relative z-10 px-4 py-5"
                style={{ perspective: "1000px" }}
            >
                <Marquee
                    direction="left"
                    speed={60}
                    pauseOnHover
                    gradient={false}
                    autoFill
                    play={isActive}
                >
                    <div className="flex gap-8 pr-8">
                        {duplicatedSpeakers.map((speaker, index) => (
                            <div
                                key={index}
                                ref={addToCardsRef}
                                className="shrink-0 w-75 relative cursor-pointer scale-90"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={subtracted}
                                        alt=""
                                        className="w-full h-auto select-none relative z-10 pointer-events-none"
                                    />

                                    <div className="absolute top-[5%] left-[7%] right-[7%] bottom-[36%] z-0 overflow-hidden">
                                        <img
                                            src={speaker.img}
                                            alt={speaker.name}
                                            className="w-[95%] h-full object-cover object-top"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.opacity = "0";
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="door-left absolute inset-0 z-20 overflow-hidden h-70 w-60 pt-6 pr-30 left-7 top-0.5"
                                        style={{ clipPath: "inset(0 50% 0 0)" }}
                                    >
                                        <img
                                            src={left}
                                            alt=""
                                            className="w-full h-full object-cover select-none"
                                        />
                                    </div>

                                    <div
                                        className="door-right absolute inset-0 z-20 overflow-hidden w-60 h-70 pl-30 pt-6 left-7 top-0.5"
                                        style={{ clipPath: "inset(0 0 0 50%)" }}
                                    >
                                        <img
                                            src={right}
                                            alt=""
                                            className="w-full h-full object-cover select-none"
                                        />
                                    </div>

                                    <div className="absolute left-0 right-0 bottom-[17.5%] flex flex-col items-center z-40 pointer-events-none">
                                        <p
                                            className="text-3xl font-semibold text-[#2d1b2d] leading-tight p-1 tracking-wide"
                                            style={{ fontFamily: "Akumaru, serif" }}
                                        >
                                            {speaker.name}
                                        </p>

                                        <p className="text-lg text-[#5a475a] mt-2 font-medium tracking-wide p-1">
                                            {speaker.title}
                                        </p>

                                        <p className="text-sm text-[#7a687a] mt-1 uppercase tracking-wider opacity-80 p-1">
                                            {speaker.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#f5e6d3] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#f5e6d3] to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Speakers;