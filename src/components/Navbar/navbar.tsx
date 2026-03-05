import { useRef, useEffect, useContext, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LenisContext } from "../../contexts/LenisContext";
import { Link } from "react-router-dom";

import branch from "../../assets/branch.webp";
import gLantern from "../../assets/lantern.webp";
import flower from "../../assets/flower.webp";
import bird from "../../assets/birdie.webp";
import birdUp from "../../assets/birdie_fly_up.webp";
import birdDown from "../../assets/birdie_fly_down.webp";
import passBrushstroke from "../../assets/passBrushstroke.webp";

import "./navbar.css";

gsap.registerPlugin(ScrollTrigger);

const desktopNavItems = [
    { label: "ABOUT", id: "about" },
    { label: "ZONALS", id: "zonals" },
    { label: "EVENTS", id: "events" },
    { label: "SPEAKERS", id: "speakers" },
    { label: "SPONSORS", id: "sponsors" },
];

const mobileNavItems = [
    { label: "HOME", id: "hero" },
    { label: "ABOUT", id: "about" },
    { label: "ZONALS", id: "zonals" },
    { label: "EVENTS", id: "events" },
    { label: "SPEAKERS", id: "speakers" },
    { label: "SPONSORS", id: "sponsors" },
    { label: "TEAM", id: "team", isRoute: true },
];

interface NavbarProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
    startTransition: () => void;
}

const Navbar = ({ heroRef, startTransition }: NavbarProps) => {
    const [birdFrame, setBirdFrame] = useState(bird);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);
    const birdRef = useRef<HTMLImageElement>(null);

    const { scrollTo } = useContext(LenisContext);

    const defaultScale = 0.75;
    const scaleDownFactor = 0.4;

    /* preload bird frames */
    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = birdUp;
        img2.src = birdDown;
    }, []);

    /* main GSAP + scroll logic */
    useEffect(() => {
        if (!heroRef.current || !navRef.current) return;

        const nav = navRef.current;

        let scaled = false;
        let hovered = false;

        gsap.set(nav, {
            scaleX: defaultScale,
            scaleY: defaultScale + 0.05,
            transformOrigin: "100% 0%",
        });

        gsap.to(nav, {
            rotation: 1,
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });

        const lanterns = nav.querySelectorAll(".lantern-wrapper");

        lanterns.forEach((lantern, index) => {
            gsap.set(lantern, {
                transformOrigin: "50% 0%",
                rotation: -1,
            });

            gsap.to(lantern, {
                rotation: 1.2 * (index % 2 === 0 ? 1 : -1),
                duration: 3 - index * 0.3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.1,
            });
        });

        const scrollTrigger = ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,

            onUpdate(self) {
                const progress = self.progress;

                const currentScaleX =
                    defaultScale - (defaultScale - scaleDownFactor) * progress;

                const currentScaleY =
                    defaultScale +
                    0.05 -
                    (defaultScale + 0.05 - (scaleDownFactor + 0.05)) * progress;

                if (!hovered) {
                    gsap.set(nav, {
                        scaleX: currentScaleX,
                        scaleY: currentScaleY,
                    });
                }

                scaled = progress > 0.05;

                if (!scaled && hovered) {
                    hovered = false;

                    gsap.to(nav, {
                        scaleX: defaultScale,
                        scaleY: defaultScale + 0.05,
                        duration: 0.2,
                    });
                }
            },
        });

        const handleMouseEnter = () => {
            if (!scaled) return;

            hovered = true;

            gsap.to(nav, {
                scaleX: defaultScale,
                scaleY: defaultScale + 0.05,
                duration: 0.3,
                ease: "back.out(1.7)",
            });
        };

        const handleMouseLeave = () => {
            if (!scaled) return;

            hovered = false;

            gsap.to(nav, {
                scaleX: scaleDownFactor,
                scaleY: scaleDownFactor + 0.05,
                duration: 0.3,
                ease: "back.out(1.7)",
            });
        };

        nav.addEventListener("mouseenter", handleMouseEnter);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            scrollTrigger.kill();
            nav.removeEventListener("mouseenter", handleMouseEnter);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [heroRef]);

    const handleNavClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) scrollTo(element);
    };

    const handleBirdClick = () => {
        if (!birdRef.current) return;

        const birdEl = birdRef.current;

        let toggle = false;
        let lastTime = 0;
        let animationFrameId: number;

        const flapDelay = 220;

        const flapLoop = (time: number) => {
            if (time - lastTime >= flapDelay) {
                toggle = !toggle;
                setBirdFrame(toggle ? birdUp : birdDown);
                lastTime = time;
            }

            animationFrameId = requestAnimationFrame(flapLoop);
        };

        const startFlap = () => {
            animationFrameId = requestAnimationFrame(flapLoop);
        };

        const stopFlap = () => {
            cancelAnimationFrame(animationFrameId);
            setBirdFrame(birdUp);
        };

        const tl = gsap.timeline({
            onComplete: () => {
                stopFlap();
            },
        });
        setTimeout(() => {
            startTransition();
        }, 600);
        tl.to(birdEl, {
            rotation: -10,
            yoyo: true,
            repeat: 6,
            duration: 0.04,
            ease: "power1.inOut",
        })
        .add(startFlap)
        .to(birdEl, {
            y: -40,
            duration: 0.3,
            ease: "power2.out",
        })
            .to(
                birdEl,
                {
                    x: -window.innerWidth * 1.5,
                    duration: 1.6,
                    rotation: -25,
                    scale: 0.75,
                    ease: "power2.in",
                },
                "<"
            )
            .to(
                birdEl,
                {
                    y: `-=${20 + Math.floor(Math.random() * 10)}`,
                    repeat: 4,
                    yoyo: true,
                    duration: 0.4,
                    ease: "sine.inOut",
                },
                "<"
            );
    };

    /* bird idle fidget */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!birdRef.current) return;

            const birdEl = birdRef.current;

            gsap.killTweensOf(birdEl, "rotation");

            gsap
                .timeline()
                .to(birdEl, {
                    rotation: 5,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.08,
                    ease: "power1.inOut",
                })
                .to(birdEl, {
                    rotation: -5,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.08,
                    ease: "power1.inOut",
                });
        }, 5640);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div ref={navRef} className="navbar">
                <img className="branch" src={branch} alt="branch" />

                <div className="lanterns">
                    {desktopNavItems.map((item, index) => (
                        <Link
                            key={item.id}
                            to={`#${item.id}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                            className={`lantern-wrapper l${index + 1}`}
                        >
                            <div className={`lantern-chain c${index + 1}`} />

                            <img
                                className="lantern"
                                src={gLantern}
                                alt={`lantern ${item.label}`}
                            />

                            <span className="lantern-label">{item.label}</span>

                            <img src={flower} alt="flower" className="flower" />
                        </Link>
                    ))}
                </div>

                <img
                    ref={birdRef}
                    className="birdie"
                    src={birdFrame}
                    alt="bird"
                    onClick={handleBirdClick}
                />

                <div
                    className="mobile-menu-lantern lantern-wrapper"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <img src="/menu.webp" alt="Menu" className="lantern" />
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="mobile-menu-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="mobile-menu-close"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ✕
                        </button>

                        <nav className="mobile-menu-nav">
                            {mobileNavItems.map((item) =>
                                item.isRoute ? (
                                    <Link
                                        key={item.id}
                                        to={`/${item.id}`}
                                        className="mobile-menu-item"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <img
                                            src={passBrushstroke}
                                            alt=""
                                            className="mobile-menu-item-bg"
                                        />
                                        <span className="mobile-menu-item-label">
                                            {item.label}
                                        </span>
                                    </Link>
                                ) : (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="mobile-menu-item"
                                        onClick={(e) => {
                                            handleNavClick(e, item.id);
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        <img
                                            src={passBrushstroke}
                                            alt=""
                                            className="mobile-menu-item-bg"
                                        />
                                        <span className="mobile-menu-item-label">
                                            {item.label}
                                        </span>
                                    </a>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;