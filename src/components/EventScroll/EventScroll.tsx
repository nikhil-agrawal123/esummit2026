import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Calendar, MapPin } from "lucide-react";

import handleTop from "../../assets/events/scroll-handle-top.png";
import handleBottom from "../../assets/events/scroll-handle-bottom.png";
import paperTexture from "../../assets/events/scroll-paper.png";
import buttonTexture from "../../assets/events/back.png";

export interface EventData {
    id: number;
    title: string;
    date: string;
    venue: string;
    link: string;
    category?: string;
}

interface EventScrollProps {
    event: EventData;
    index: number;
}

const EventScroll = ({ event, index }: EventScrollProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Convert newline-separated title string to React elements
    const renderTitle = (title: string) => {
        return title.split("\n").map((line, i, arr) => (
            <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
            </span>
        ));
    };

    useEffect(() => {
        if (!bodyRef.current) return;

        if (bodyRef.current.style.height !== "0px") {
            gsap.to(bodyRef.current, {
                height: isExpanded ? "380px" : "280px",
                duration: 0.8,
                ease: "power2.inOut",
            });

            if (isExpanded && detailsRef.current) {
                gsap.fromTo(
                    detailsRef.current,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.4, delay: 0.3 }
                );
            }
        }
    }, [isExpanded]);

    return (
        <div
            className="scroll-container relative flex flex-col items-center w-64 md:w-72 lg:w-80 opacity-0 origin-top z-30"
            data-index={index}
        >
            <img
                src={handleTop}
                alt="Scroll Top"
                className="w-full z-20 relative drop-shadow-xl select-none"
            />

            <div
                ref={bodyRef}
                className="scroll-body relative w-[86%] z-10 overflow-hidden flex flex-col items-center -mt-4"
                style={{
                    backgroundImage: `url(${paperTexture})`,
                    backgroundSize: "100% 100%",
                    height: "0px",
                }}
            >
                {/* Creative Touch: A giant, faint number in the background */}
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none z-0"
                    style={{ fontFamily: "Akumaru, serif" }}
                >
                    <span className="text-9xl text-[#5e2f0d] scale-150">
                        0{index + 1}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center h-full w-full px-4 md:px-6 py-6 relative z-10">
                    <h3
                        className="text-2xl md:text-3xl text-[#2A1B1B] text-center leading-[1.2] tracking-wide"
                        style={{ fontFamily: "Akumaru, serif" }}
                    >
                        {renderTitle(event.title)}
                    </h3>

                    {!isExpanded ? (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="relative group flex items-center justify-center mt-12 transition-transform duration-300 hover:scale-105 active:scale-95"
                        >
                            <img
                                src={buttonTexture}
                                alt="Texture"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] md:w-[180px] max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="relative z-10 px-4 py-2 text-[#5e2f0d] text-xs md:text-sm font-bold font-serif tracking-[0.15em] drop-shadow-sm group-hover:text-[#2A1B1B]">
                                VIEW DETAILS
                            </span>
                        </button>
                    ) : (
                        <div
                            ref={detailsRef}
                            className="flex flex-col items-center w-full px-2 mt-6 space-y-4 text-[#5e2f0d] font-serif text-sm md:text-base"
                        >
                            <div className="flex items-center gap-3 w-full justify-center">
                                <Calendar size={18} className="shrink-0" />
                                <span className="text-center">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-3 w-full justify-center">
                                <MapPin size={18} className="shrink-0" />
                                <span className="text-center">{event.venue}</span>
                            </div>

                            <a
                                href={event.link}
                                target="_blank"
                                className="relative group self-center flex items-center justify-center mt-10 transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                <img
                                    src={buttonTexture}
                                    alt="Texture"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] md:w-[180px] max-w-none pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="relative z-10 px-4 py-2 font-serif font-bold tracking-[0.2em] text-[#5e2f0d] text-sm md:text-base drop-shadow-sm group-hover:text-[#2A1B1B]">
                                    REGISTER
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <img
                src={handleBottom}
                alt="Scroll Bottom"
                className="scroll-bottom w-full z-20 relative -mt-4 drop-shadow-xl select-none pointer-events-none"
            />
        </div>
    );
};

export default EventScroll;
