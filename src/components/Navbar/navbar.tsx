import { useRef, useEffect, useContext, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LenisContext } from "../../contexts/LenisContext";
import { Link, useNavigate } from "react-router-dom";

import branch from "../../assets/branch.webp";
import gLantern from "../../assets/lantern.webp";
import flower from "../../assets/flower.webp";
import bird from "../../assets/birdie.png";
import birdUp from "../../assets/birdie_fly_up.png";
import birdDown from "../../assets/birdie_fly_down.png";

import "./navbar.css";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
    { label: "ABOUT", id: "about" },
    { label: "ZONALS", id: "zonals" },
    { label: "EVENTS", id: "events" },
    { label: "SPEAKERS", id: "speakers" },
    { label: "SPONSORS", id: "sponsors" },
];

interface NavbarProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
}

const Navbar = ({ heroRef }: NavbarProps) => {
    const [birdFrame, setBirdFrame] = useState(bird);
    const navRef = useRef<HTMLDivElement>(null);
    const birdRef = useRef<HTMLImageElement>(null);
    const navigate = useNavigate();
    const { scrollTo } = useContext(LenisContext);

    const defaultScale = 0.75;
    const scaleDownFactor = 0.4;

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
            onUpdate: (self) => {
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
            },
        });

        return () => {
            scrollTrigger.kill();
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

        let flapInterval: number;
        let toggle = false;

        const startFlap = () => {
            flapInterval = window.setInterval(() => {
                toggle = !toggle;
                setBirdFrame(toggle ? birdUp : birdDown);
            }, 220); 
        };

        const stopFlap = () => {
            clearInterval(flapInterval);
            setBirdFrame(birdUp); 
        };

        startFlap();

        const tl = gsap.timeline({
            onComplete: () => {
                stopFlap();
                navigate("/team");
                // navigate("/");
            },
        });
        tl.to(birdEl, {
            rotation: -10,
            yoyo: true,
            repeat: 6,
            duration: 0.06,
            ease: "power1.inOut",
        })

            .to(birdEl, {
                y: -40,
                duration: 0.3,
                ease: "power2.out",
            })

            .to(birdEl, {
                x: -window.innerWidth * 1.5,
                duration: 1.5,
                rotation: -25,
                scale: 0.75,
                opacity: 0,
                ease: "power2.in",
            }, "<")

            .to(birdEl, {
                y: `-=${40 + Math.floor(Math.random()*10)}`,
                repeat: 12,
                yoyo: true,
                duration: 0.8,
                ease: "sine.inOut",
            }, "<");
    };

    return (
        <div ref={navRef} className="navbar">
            <img className="branch" src={branch} alt="branch" />

            <div className="lanterns">
                {navItems.map((item, index) => (
                    <Link
                        key={item.id}
                        to={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`lantern-wrapper l${index + 1}`}
                    >
                        <div className={`lantern-chain c${index + 1}`} />
                        <img className="lantern" src={gLantern} alt={item.label} />
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
        </div>
    );
};

export default Navbar;