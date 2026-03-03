import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import eventsBg from "../assets/events/events-bg.png";
import speakersData from "../data/speakers.json";
import left from "../assets/events/window-left-panel.png";
import right from "../assets/events/window-right-panel.png";
import subtracted from "../assets/events/window-subtract.png";

interface Speaker {
    name: string;
    title: string;
    bio: string;
    img: string;
}

const Speakers = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const speakerCardsRef = useRef<HTMLDivElement[]>([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

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
        const ctx = gsap.context(() => {
            // Heading animation on scroll
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

            if (!marqueeInnerRef.current || !isDesktop) return;

            const cardWidth = 320; // Width of each speaker card + gap
            const totalWidth = speakers.length * cardWidth;

            // Set initial position
            gsap.set(marqueeInnerRef.current, { x: 0 });

            // Infinite marquee animation
            const marqueeAnim = gsap.to(marqueeInnerRef.current, {
                x: -totalWidth,
                duration: speakers.length * 4, // 4 seconds per speaker
                ease: "none",
                repeat: -1,
            });

            const doorStates = new Map<HTMLElement, number>(); // Track current target for each door
            
            const updateDoors = () => {
                if (!marqueeRef.current) return;
                
                const marqueeRect = marqueeRef.current.getBoundingClientRect();
                const visibleLeft = marqueeRect.left;
                const visibleRight = marqueeRect.right;
                const visibleWidth = visibleRight - visibleLeft;
                const edgeZone = visibleWidth * 0.3; // 30% edge zone for door animation

                speakerCardsRef.current.forEach((card) => {
                    if (!card) return;
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    
                    const leftDoor = card.querySelector(".door-left") as HTMLElement;
                    const rightDoor = card.querySelector(".door-right") as HTMLElement;
                    
                    if (!leftDoor || !rightDoor) return;

                    // Calculate door open percentage based on position
                    let openPercent = 1;

                    // Entering from right
                    if (cardCenter > visibleRight - edgeZone) {
                        openPercent = Math.max(0, (visibleRight - cardCenter) / edgeZone);
                    }
                    // Exiting to left
                    else if (cardCenter < visibleLeft + edgeZone) {
                        openPercent = Math.max(0, (cardCenter - visibleLeft) / edgeZone);
                    }

                    // Apply easing curve for smoother motion
                    const easedPercent = gsap.parseEase("power2.out")(openPercent);
                    const slideAmount = 45 * easedPercent; // Max 45% slide
                    
                    const currentTarget = doorStates.get(leftDoor) ?? -1;
                    if (Math.abs(currentTarget - slideAmount) > 0.5) {
                        doorStates.set(leftDoor, slideAmount);
                        
                        // Smooth tween to target position
                        gsap.to(leftDoor, {
                            x: `-${slideAmount}%`,
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                        gsap.to(rightDoor, {
                            x: `${slideAmount}%`,
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }
                });
            };

            // Update doors on every frame
            gsap.ticker.add(updateDoors);

            return () => {
                marqueeAnim.kill();
                gsap.ticker.remove(updateDoors);
            };
        }, containerRef);

        return () => ctx.revert();
    }, [isDesktop, speakers.length]);

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
                            className="flex-shrink-0 w-[280px] snap-center relative"
                        >
                            <div className="relative overflow-hidden">
                                {/* Subtracted frame - defines size */}
                                <img
                                    src={subtracted}
                                    alt=""
                                    className="w-full h-auto select-none relative z-10 pointer-events-none"
                                />
                                
                                {/* Speaker Image - positioned within the window opening */}
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

                                {/* Speaker Info - on the scroll area */}
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

    // Desktop layout - Marquee with door animation
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
            <div ref={headingRef} className="text-center mb-16 md:mb-24 relative z-10">
                <h2
                    className="text-6xl md:text-8xl text-[#2d1b2d] drop-shadow-sm select-none"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    SPEAKERS
                </h2>
            </div>

            {/* Marquee Container */}
            <div
                ref={marqueeRef}
                className="w-full max-w-[1400px] mx-auto overflow-hidden relative z-10 px-4"
                style={{ perspective: "1000px" }}
            >
                {/* Marquee Inner - moves left */}
                <div
                    ref={marqueeInnerRef}
                    className="flex gap-8"
                    style={{ willChange: "transform" }}
                >
                    {duplicatedSpeakers.map((speaker, index) => (
                        <div
                            key={index}
                            ref={addToCardsRef}
                            className="flex-shrink-0 w-[300px] relative cursor-pointer"
                        >
                            <div className="relative overflow-hidden">
                                {/* Subtracted frame - defines size and provides the frame overlay */}
                                <img
                                    src={subtracted}
                                    alt=""
                                    className="w-full h-auto select-none relative z-10 pointer-events-none"
                                />
                                
                                {/* Speaker Image - positioned within the window opening */}
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

                                {/* Door Left - slides left to reveal */}
                                <div
                                    className="door-left absolute inset-0 z-20 overflow-hidden h-70 w-60 pt-6 pr-30"
                                    style={{ clipPath: "inset(0 50% 0 0)" }}
                                >
                                    <img
                                        src={left}
                                        alt=""
                                        className="w-full h-full object-cover select-none"
                                    />
                                </div>

                                {/* Door Right - slides right to reveal */}
                                <div
                                    className="door-right absolute inset-0 z-20 overflow-hidden w-60 h-70 pl-30 pt-6"
                                    style={{ clipPath: "inset(0 0 0 50%)" }}
                                >
                                    <img
                                        src={right}
                                        alt=""
                                        className="w-full h-full object-cover select-none"
                                    />
                                </div>

                                {/* Speaker Info - on the scroll area */}
                                <div className="absolute bottom-[8%] left-0 w-full text-center z-40 pointer-events-none px-4">
                                    <p
                                        className="text-xl text-[#2d1b2d] font-bold drop-shadow-sm"
                                        style={{ fontFamily: "Akumaru, serif" }}
                                    >
                                        {speaker.name}
                                    </p>
                                    <p className="text-sm text-[#4a3a4a] mt-1">{speaker.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f5e6d3] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f5e6d3] to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Speakers;
