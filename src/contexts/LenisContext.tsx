import { createContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

interface LenisContextValue {
    scrollTo: (target: string | HTMLElement | number) => void;
}

export const LenisContext = createContext<LenisContextValue>({
    scrollTo: () => {},
});

interface LenisProviderProps {
    children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenisInstance = new Lenis({ lerp: 0.1 });
        lenisRef.current = lenisInstance;

        lenisInstance.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    const scrollTo = (target: string | HTMLElement | number) => {
        lenisRef.current?.scrollTo(target, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
    };

    return (
        <LenisContext.Provider value={{ scrollTo }}>
            {children}
        </LenisContext.Provider>
    );
};