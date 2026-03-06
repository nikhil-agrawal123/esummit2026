import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Calendar, MapPin } from "lucide-react";

import handleTop from "../../assets/events/scroll-handle-top.webp";
import handleBottom from "../../assets/events/scroll-handle-bottom.webp";
import paperTexture from "../../assets/events/scroll-paper.png";
import buttonTexture from "../../assets/events/back.webp";
import mobileScroll from "../../assets/events/mobile-scroll.png";

export interface EventData {
    id: number;
    title: string;
    date: string;
    venue: string;
    link: string;
    desc?: string;
}

interface EventScrollProps {
    event: EventData;
    index: number;
}

const EventScroll = ({ event, index }: EventScrollProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

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

        gsap.to(bodyRef.current, {
            height: isExpanded ? "340px" : "280px",
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

        if (mobileRef.current) {
            gsap.to(mobileRef.current, {
                height: "200px",
                duration: 0.3,
            });
        }
    }, [isExpanded]);

    return (
        <div
            className="scroll-container relative flex flex-col items-center w-full md:w-72 lg:w-80 opacity-0 origin-top z-30"
            data-index={index}
        >
            {/* MOBILE */}

            <div
                ref={mobileRef}
                className="md:hidden relative w-[90%] h-50 flex items-center justify-center"
                style={{
                    backgroundImage: `url(${mobileScroll})`,
                    backgroundSize: "100% 100%",
                }}
            >
                <div className="flex items-center justify-between w-full px-10 ml-8!">
                    <div className="flex flex-col max-w-45 gap-2">
                        <h3
                            className="text-xl font-light text-[#2A1B1B] leading-tight"
                            style={{ fontFamily: "Akumaru, serif" }}
                        >
                            {renderTitle(event.title)}
                        </h3>

                        <div className="flex flex-col mt-3 space-y-1 text-[#5e2f0d] gap-1 text-xs">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                {event.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                {event.venue}
                            </div>
                        </div>
                    </div>

                    <a
                        href={event.link}
                        target="_blank"
                        className="relative group flex items-center justify-center transition-transform duration-300 hover:scale-105 mr-2! scale-110"
                    >
                        <img src={buttonTexture} alt="Texture" className="w-27.5" />
                        <span className="absolute text-xs font-bold tracking-[0.15em] text-[#5e2f0d]">
                            Go
                        </span>
                    </a>
                </div>
            </div>

            {/* DESKTOP */}

            <div
                className="hidden md:flex flex-col items-center w-full"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <img
                    src={handleTop}
                    alt="Scroll Top"
                    className="w-full z-20 relative drop-shadow-xl select-none"
                />

                <div
                    ref={bodyRef}
                    className="scroll-body relative w-full h-[110%] z-10 overflow-hidden flex flex-col items-center -mt-4"
                    style={{
                        backgroundImage: `url(${paperTexture})`,
                        backgroundSize: "100% 100%",
                        height: "280px",
                    }}
                >
                    <div
                        className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none z-0 "
                        style={{ fontFamily: "Akumaru, serif" }}
                    >
                        <span className="text-9xl text-[#5e2f0d] scale-150">
                            0{index + 1}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center h-[90%] w-[90%] px-6 py-6 relative z-10">
                        <h3
                            className="text-3xl font-medium py-3! text-[#2A1B1B] text-center leading-[1.2]"
                            style={{ fontFamily: "Akumaru, serif" }}
                        >
                            {renderTitle(event.title)}
                        </h3>

                        <div className="flex flex-col items-center gap-2 mt-6 space-y-4 text-[#5e2f0d]">
                            <div className="flex items-center gap-3 font-medium text-sm">
                                <Calendar size={15} />
                                {event.date}
                            </div>

                            <div className="flex items-center gap-3 font-medium text-sm">
                                <MapPin size={15} />
                                {event.venue}
                            </div>

                            <div
                                className={`flex flex-col items-center gap-4 transition-all duration-500 ease-out overflow-hidden ${
                                    isExpanded
                                        ? "opacity-100 translate-y-0 max-h-40"
                                        : "opacity-0 -translate-y-3 max-h-0 pointer-events-none"
                                }`}
                            >
                                {event.desc && (
                                    <p className="text-center text-sm max-w-45">
                                        {event.desc}
                                    </p>
                                )}

                                <a
                                    href={event.link}
                                    target="_blank"
                                    className="relative group flex items-center justify-center mt-4 transition-transform duration-500 hover:scale-105"
                                >
                                    <img
                                        src={buttonTexture}
                                        alt="Texture"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 scale-175"
                                    />
                                    <span className="relative z-10 px-4 py-6 tracking-[0.2em] text-[#5e2f0d] font-semibold text-xl">
                                        Register
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <img
                    src={handleBottom}
                    alt="Scroll Bottom"
                    className="scroll-bottom w-full z-20 relative -mt-4 drop-shadow-xl select-none pointer-events-none"
                />
            </div>
        </div>
    );
};

export default EventScroll;