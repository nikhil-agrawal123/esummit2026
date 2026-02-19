import Hero from "./pages/hero";
import Petals from "./components/Petals/petals";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar/navbar";
import About from "./pages/about";
import Sponsors from "./pages/sponsors";
gsap.registerPlugin(ScrollTrigger);

function App() {
    const firstHeroRef = useRef<HTMLDivElement | null>(null);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const scaleDownFactor = 0.4;
    let scaled = false;
    let hovered = false;

    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.1 });

        const raf = (time: number) => {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }, []);


    useGSAP(() => {
        if (!firstHeroRef.current || !navbarRef.current) return;

        const nav = navbarRef.current;

        gsap.to(nav, {
            scaleX: scaleDownFactor,
            scaleY: scaleDownFactor + 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: firstHeroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: self => {
                    scaled = self.progress > 0.05;
                    if (!scaled && hovered) {
                        hovered = false;
                        gsap.to(nav, {
                            scaleX: 1,
                            scaleY: 1,
                            duration: 0.2,
                        });
                    }
                },
            },
        });

        nav.addEventListener("mouseenter", () => {
            if (!scaled) return;

            hovered = true;

            gsap.to(nav, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.3,
                ease: "back.out(1.7)",
            });
        });

        nav.addEventListener("mouseleave", () => {
            if (!scaled) return;

            hovered = false;

            gsap.to(nav, {
                scaleX: scaleDownFactor,
                scaleY: scaleDownFactor + 0.05,
                duration: 0.3,
                ease: "back.out(1.7)",
            });
        });
    }, []);

    return (
        <>
            <Navbar ref={navbarRef} />
            <Hero ref={firstHeroRef} />
            <About />
            <Sponsors />
            <Petals count={50} />
        </>
    );
}

export default App;
