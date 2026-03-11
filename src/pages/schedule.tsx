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

// Map event names to manga panel images
const mangaImageMap: Record<string, string> = {
    "Opening Ceremony": "/assets/manga/ceremony.png",
    "Keynote: Future of Tech": "/assets/manga/tech.png",
    "Panel: Startups 101": "/assets/manga/discussion.png",
    "Networking Lunch": "/assets/manga/social.png",
    "Workshop: AI for All": "/assets/manga/tech.png",
    "Cultural Performance": "/assets/manga/performance.png",
    "Startup Pitch": "/assets/manga/discussion.png",
    "Yoga & Meditation": "/assets/manga/wellness.png",
    "Workshop: Design Thinking": "/assets/manga/hackathon.png",
    "Fireside Chat": "/assets/manga/discussion.png",
    "Lunch Break": "/assets/manga/social.png",
    "Panel: Women in Tech": "/assets/manga/discussion.png",
    "Hackathon Finale": "/assets/manga/hackathon.png",
    "Closing Ceremony": "/assets/manga/ceremony.png",
};

// Manga sound effects per event for extra flair
const mangaSfx: Record<string, string> = {
    "Opening Ceremony": "ドドドド!!",
    "Keynote: Future of Tech": "ギュンッ!",
    "Panel: Startups 101": "ザワザワ",
    "Networking Lunch": "もぐもぐ",
    "Workshop: AI for All": "カタカタ!",
    "Cultural Performance": "シャアッ",
    "Startup Pitch": "バーン!!",
    "Yoga & Meditation": "スゥー...",
    "Workshop: Design Thinking": "ゴゴゴゴ",
    "Fireside Chat": "フッ...",
    "Lunch Break": "ワイワイ",
    "Panel: Women in Tech": "キラキラ✦",
    "Hackathon Finale": "ドカーン!!",
    "Closing Ceremony": "パチパチ!!",
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

                                    <div className="schedule-jp-card-title">{event.name}</div>
                                    <div className="schedule-jp-card-desc">
                                        {event.description}
                                    </div>

                                    <div className="schedule-jp-card-meta">
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
                Schedule is subject to minor changes. Final program will be sent to all
                registered attendees.
            </div>

            {/* Download */}
            <div className="schedule-jp-download-wrap">
                <button className="schedule-jp-download-btn">
                    Download Full Program (PDF)
                </button>
            </div>
        </div>
    );
};

export default Schedule;