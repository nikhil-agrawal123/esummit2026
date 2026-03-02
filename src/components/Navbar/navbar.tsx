import { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LenisContext } from "../../contexts/LenisContext";
import branch from "../../assets/branch.webp";
import gLantern from "../../assets/lantern.webp";
import flower from "../../assets/flower.webp";
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
    const navRef = useRef<HTMLDivElement>(null);
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
                rotation: 1.2 * (index % 2 == 0 ? 1 : -1),
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
        if (element) {
            scrollTo(element);
        }
    };

    return (
        <div ref={navRef} className="navbar">
            <img
                fetchPriority="high"
                className="branch"
                src={branch}
                alt="branch"
            />

            <div className="lanterns">
                {navItems.map((item, index) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`lantern-wrapper l${index + 1}`}
                    >
                        <div className={`lantern-chain c${index + 1}`} />
                        <img
                            className="lantern"
                            alt={item.label}
                            src={gLantern}
                        />
                        <span
                            className={`lantern-label w-10 nowrap ${item.label.toLowerCase()}`}
                        >
                            {item.label}
                        </span>
                        <img
                            src={flower}
                            alt="Flower"
                            className="flower"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Navbar;