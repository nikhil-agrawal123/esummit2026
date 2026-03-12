import scheduleData from "../data/scheduleDemo.json";
import type { ScheduleDay } from "../types/schedule";
import "../styles/schedulePanel.css";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

import bg from "../assets/zonals_background.webp";
import passBrushstroke from "../assets/passBrushstroke.webp";

gsap.registerPlugin(ScrollTrigger);

const dayLabels = [
    { kanji: "第一日", en: "Day 1", date: "April 13, 2026" },
    { kanji: "第二日", en: "Day 2", date: "April 14, 2026" },
];

const mangaImageMap: Record<string, string> = {
    "Inauguration + Anshuman Tripathi": "/assets/manga/ceremony.png",
    "Tesseract Start": "/assets/manga/tech.png",
    "Startup Fair": "/assets/manga/social.png",
    "Hack4Impact - 24 Hr Hackathon": "/assets/manga/hackathon.png",
    "Trading Heist": "/assets/manga/tech.png",
    "B-Plan": "/assets/manga/discussion.png",
    "Venture Verse": "/assets/manga/discussion.png",
    "Pitch Cafe - Student Track": "/assets/manga/discussion.png",
    "Shark Tank": "/assets/manga/discussion.png",
    "BlindStorm": "/assets/manga/hackathon.png",
    "BGMI": "/assets/manga/tech.png",
    "Krafton": "/assets/manga/tech.png",
    "Canvas Painting": "/assets/manga/wellness.png",
    "Vijender Chauhan": "/assets/manga/discussion.png",
    "J-Lang Course (Placement Cell)": "/assets/manga/discussion.png",
    "Battle of Bands": "/assets/manga/performance.png",
    "Alumni Panel": "/assets/manga/discussion.png",
    "Team Dinner": "/assets/manga/social.png",
    "Hack4Impact": "/assets/manga/hackathon.png",
    "Tesseract - Entrepreneurship Hunt": "/assets/manga/tech.png",
    "SHEO panel": "/assets/manga/discussion.png",
    "Storage Wars": "/assets/manga/discussion.png",
    "E-Pitch Cafe - Startup Track": "/assets/manga/discussion.png",
    "IPL Auction": "/assets/manga/discussion.png",
    "Inspire India": "/assets/manga/discussion.png",
    "Strategy Showdown": "/assets/manga/discussion.png",
    "Mind The Product": "/assets/manga/discussion.png",
    "Waiting Room - EPitch Cafe": "/assets/manga/social.png",
    "Case Study Competition": "/assets/manga/discussion.png",
    "StartUp Showdown": "/assets/manga/discussion.png",
    "Comedian": "/assets/manga/performance.png",
    "Bid Bonanza": "/assets/manga/discussion.png",
    "Team & Guests Lunch": "/assets/manga/social.png",
    "Incubation": "/assets/manga/tech.png",
    "Tote Bag Competition": "/assets/manga/performance.png",
    "Closing Note and Award Ceremony": "/assets/manga/ceremony.png"
};

// Manga sound effects per event for extra flair
const mangaSfx: Record<string, string> = {
    "Inauguration + Anshuman Tripathi": "ドドドド!!",
    "Tesseract Start": "ギュンッ!",
    "Startup Fair": "ザワザワ",
    "Hack4Impact - 24 Hr Hackathon": "カタカタ!",
    "Trading Heist": "バーン!!",
    "B-Plan": "ゴゴゴゴ",
    "Venture Verse": "ドドドド!!",
    "Pitch Cafe - Student Track": "ワイワイ",
    "Shark Tank": "シャアッ",
    "BlindStorm": "ドン!",
    "BGMI": "ドカーン!!",
    "Krafton": "ドカーン!!",
    "Canvas Painting": "スゥー...",
    "Vijender Chauhan": "フッ...",
    "J-Lang Course (Placement Cell)": "カタカタ!",
    "Battle of Bands": "シャアッ",
    "Alumni Panel": "ザワザワ",
    "Team Dinner": "もぐもぐ",
    "Hack4Impact": "カタカタ!",
    "Tesseract - Entrepreneurship Hunt": "ギュンッ!",
    "SHEO panel": "キラキラ✦",
    "Storage Wars": "バーン!!",
    "E-Pitch Cafe - Startup Track": "ワイワイ",
    "IPL Auction": "ドカーン!!",
    "Inspire India": "キラキラ✦",
    "Strategy Showdown": "ゴゴゴゴ",
    "Mind The Product": "ドドドド!!",
    "Waiting Room - EPitch Cafe": "ワイワイ",
    "Case Study Competition": "ドン!",
    "StartUp Showdown": "ドドドド!!",
    "Comedian": "ワハハ!!", 
    "Bid Bonanza": "バーン!!",
    "Team & Guests Lunch": "もぐもぐ",
    "Incubation": "フッ...",
    "Tote Bag Competition": "シャアッ",
    "Closing Note and Award Ceremony": "パチパチ!!"
};

const fallbackManga = "/assets/manga/ceremony.png";

interface ScheduleProps {
    startTransition: (targetRoute: string) => void;
}

const Schedule = ({ startTransition }: ScheduleProps) => {
    const data = scheduleData as ScheduleDay[];
    const [activeDay, setActiveDay] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    // GSAP stagger-in animation on day change
    useEffect(() => {
        if (!timelineRef.current) return;

        const rows =
            timelineRef.current.querySelectorAll<HTMLElement>(".schedule-jp-row");

        gsap.set(rows, { opacity: 0, y: 40 });

        gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.1,
        });

        return () => {
            gsap.killTweensOf(rows);
        };
    }, [activeDay]);

    const events = data[activeDay]?.events ?? [];

    return (
        <div className="schedule-jp-page">
            {/* Background */}
            <div
                className="schedule-jp-bg"
                style={{ backgroundImage: `url(${bg})` }}
            />

            {/* Back Button */}
            <div
                onClick={() => startTransition("/")}
                className="fixed w-45 top-6 left-12 z-9997 flex items-center gap-2 px-4 py-2 overflow-hidden scale-150 cursor-pointer"
            >
                <img
                    src={passBrushstroke}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <div className="content flex items-center justify-center gap-2 mx-6!">
                    <ArrowLeft size={18} className="text-[#9c4308] relative z-10" />
                    <span className="font-semibold tracking-wide relative z-10 font-['Akumaru'] text-[25px] text-[#9c4308]">
                        Home
                    </span>
                </div>
            </div>

            {/* Title */}
            <h1 className="schedule-jp-title">SCHEDULE</h1>
            <p className="schedule-jp-subtitle">スケジュール</p>

            {/* Day Switcher */}
            <div className="schedule-jp-day-switcher">
                {dayLabels.map((day, idx) => (
                    <button
                        key={day.en}
                        className={
                            "schedule-jp-day-btn" + (activeDay === idx ? " active" : "")
                        }
                        onClick={() => setActiveDay(idx)}
                    >
                        <img src={passBrushstroke} alt="" className="btn-bg" />
                        <div className="btn-content">
                            <span className="btn-kanji">{day.kanji}</span>
                            <span className="btn-date">{day.date}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="schedule-jp-timeline" ref={timelineRef}>
                {events.map((event, i) => {
                    const side = i % 2 === 0 ? "left" : "right";
                    const mangaImg = mangaImageMap[event.name] || fallbackManga;
                    const sfx = mangaSfx[event.name] || "ドン!";

                    return (
                        <div className={`schedule-jp-row ${side}`} key={`${activeDay}-${i}`}>
                            {/* Card side */}
                            <div className="schedule-jp-side">
                                <div className="schedule-jp-card">
                                    <span className="schedule-jp-card-index">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div className="schedule-jp-card-title scale-150 mx-20!">{event.name}</div>
                                    <div className="schedule-jp-card-desc scale-125 mx-15!">
                                        {event.description}
                                    </div>

                                    <div className="schedule-jp-card-meta  scale-125 mx-15!">
                                        <span className="schedule-jp-card-time">
                                            <span className="meta-icon">⏐</span>
                                            {event.time}
                                        </span>
                                        <span className="schedule-jp-card-venue">
                                            <span className="meta-icon">📍</span>
                                            {event.venue}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Manga panel side */}
                            <div className="schedule-jp-side">
                                <div className="schedule-jp-manga-panel">
                                    <img
                                        src={mangaImg}
                                        alt={event.name}
                                        className="manga-panel-img"
                                    />
                                    <span className="manga-sfx">{sfx}</span>
                                    <div className="manga-panel-border" />
                                </div>
                            </div>

                            {/* Center node */}
                            <div className="schedule-jp-node" />

                            {/* Connector line */}
                            <div className="schedule-jp-connector" />
                        </div>
                    );
                })}
            </div>

            {/* Note */}
            <div className="schedule-jp-note">
                Schedule is subject to minor changes. Please check back closer to the event for the final lineup.
            </div>
        </div>
    );
};

export default Schedule;