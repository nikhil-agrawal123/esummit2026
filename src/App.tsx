import Hero from "./pages/hero";
import Petals from "./pages/Petals/petals";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/navbar";
gsap.registerPlugin(ScrollTrigger);

function App() {
    const firstHeroRef = useRef<HTMLDivElement | null>(null);
    const navbarRef = useRef<HTMLDivElement | null>(null);

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

        gsap.to(navbarRef.current, {
            // x: () => window.innerWidth,
            // opacity: 0,
            // left: 0,
            transform: "scaleX(0.7) scaleY(0.75)",
            ease: "back.out(1.5)",
            duration: 3,
            scrollTrigger: {
                trigger: firstHeroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <>
            <Navbar ref={navbarRef} />
            <Hero ref={firstHeroRef} />
            <Petals count={50} />
        </>
    );
}

export default App;