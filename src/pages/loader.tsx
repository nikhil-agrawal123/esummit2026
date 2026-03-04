import { useRef } from "react";
import gsap from "gsap";

import loaderVid from "../assets/loader.mp4";
import left from "../assets/leftLoaderPanel.png";
import right from "../assets/rightLoaderPanel.png";

interface LoaderProps {
    onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const leftRef = useRef<HTMLImageElement>(null);
    const rightRef = useRef<HTMLImageElement>(null);

    const triggered = useRef(false);

    const handleTimeUpdate = () => {
        const v = videoRef.current;
        if (!v || triggered.current) return;

        if (v.duration - v.currentTime < 3.5) {
            triggered.current = true;

            const tl = gsap.timeline();

            tl.fromTo(
                leftRef.current,
                { x: "-100%" },
                { x: "0%", duration: 1.3, ease: "power2.inOut" }
            );

            tl.fromTo(
                rightRef.current,
                { x: "100%" },
                { x: "0%", duration: 1.3, ease: "power2.inOut" },
                "<"
            );

            setTimeout(() => {
                const v = videoRef.current;
                if (v) v.remove();
            }, 1300); 

            tl.call(() => {
                requestAnimationFrame(() => {
                    const tl2 = gsap.timeline({ onComplete: onFinish });

                    tl2.to(leftRef.current, {
                        x: "-100%",
                        duration: 1.8,
                        ease: "power3.inOut",
                    });

                    tl2.to(
                        rightRef.current,
                        {
                            x: "100%",
                            duration: 1.8,
                            ease: "power3.inOut",
                        },
                        "<"
                    );
                });
            });
        }
    };

    return (
        <div className="fixed inset-0 z-9999 w-screen h-screen overflow-hidden bg-transparent">

            {/* VIDEO */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover z-10"
                src={loaderVid}
                autoPlay
                muted
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
            />

            {/* LEFT DOOR */}
            <img
                ref={leftRef}
                src={left}
                className="absolute top-0 left-0 h-full w-1/2 object-cover z-20"
                style={{ transform: "translateX(-100%)" }}
            />

            {/* RIGHT DOOR */}
            <img
                ref={rightRef}
                src={right}
                className="absolute top-0 right-0 h-full w-1/2 object-cover z-20"
                style={{ transform: "translateX(100%)" }}
            />
        </div>
    );
}