import { useRef, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation , Navigate} from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LenisProvider } from "./contexts/LenisContext";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar/navbar";
import Petals from "./components/Petals/petals";
import Hero from "./pages/hero";
import About from "./pages/about";

import AllEvents from "./pages/allEvents";
import Footer from "./pages/footer";
import TeamPage from "./pages/TeamPage";
import Loader from "./pages/loader";

import leftDoor from "./assets/leftLoaderPanel.png";
import rightDoor from "./assets/rightLoaderPanel.png";
import SharedSection from "./pages/sharedSection";

gsap.registerPlugin(ScrollTrigger);

function RouterContent({ startTransition }: { startTransition: (targetRoute: string) => void }) {
    const heroRef = useRef<HTMLDivElement | null>(null);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Navbar heroRef={heroRef} startTransition={startTransition} />
                        <Hero ref={heroRef} />
                        <About />
                        <SharedSection startTransition={startTransition} />
                        <Petals count={50} />
                        <Footer />
                    </>
                }
            />

            <Route
                path="/all-events"
                element={
                    <>
                        <AllEvents startTransition={startTransition} />
                        <Petals count={50} />
                    </>
                }
            />

            <Route
                path="/team"
                element={
                    <>
                        <TeamPage startTransition={startTransition} />
                        <Petals count={50} />
                    </>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
}

function DoorController() {
    const navigate = useNavigate();
    const location = useLocation();

    const [doorsVisible, setDoorsVisible] = useState(false);
    const [waitingForNavigation, setWaitingForNavigation] = useState(false);

    const leftDoorRef = useRef<HTMLImageElement>(null);
    const rightDoorRef = useRef<HTMLImageElement>(null);

    const startTransition = async (targetRoute: string) => {
        await new Promise((r) => setTimeout(r, 200));
        setDoorsVisible(true);

        await new Promise<void>((resolve) => {
            const waitForDoors = () => {
                if (!leftDoorRef.current || !rightDoorRef.current) {
                    requestAnimationFrame(waitForDoors);
                    return;
                }

                gsap.timeline({ onComplete: resolve })
                    .to(leftDoorRef.current, {
                        x: "0%",
                        duration: 1.2,
                        ease: "power2.inOut",
                    })
                    .to(
                        rightDoorRef.current,
                        {
                            x: "0%",
                            duration: 1.2,
                            ease: "power2.inOut",
                        },
                        "<"
                    );
            };

            waitForDoors();
        });

        setWaitingForNavigation(true);

        navigate(targetRoute);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (!waitingForNavigation) return;

        requestAnimationFrame(() => {
            gsap.timeline({
                onComplete: () => {
                    setDoorsVisible(false);
                    setWaitingForNavigation(false);
                },
            })
                .to(leftDoorRef.current, {
                    x: "-100%",
                    duration: 1.2,
                    ease: "power3.inOut",
                })
                .to(
                    rightDoorRef.current,
                    {
                        x: "100%",
                        duration: 1.2,
                        ease: "power3.inOut",
                    },
                    "<"
                );
        });
    }, [location.pathname]);

    return (
        <>
            {doorsVisible && (
                <div className="fixed inset-0 z-9999 pointer-events-none">
                    <img
                        ref={leftDoorRef}
                        src={leftDoor}
                        className="absolute top-0 left-0 h-full w-1/2 object-cover"
                        style={{ transform: "translateX(-100%)" }}
                    />

                    <img
                        ref={rightDoorRef}
                        src={rightDoor}
                        className="absolute top-0 right-0 h-full w-1/2 object-cover"
                        style={{ transform: "translateX(100%)" }}
                    />
                </div>
            )}

            <RouterContent startTransition={startTransition} />
        </>
    );
}

function App() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const [loaderDone, setLoaderDone] = useState(isMobile);
    const [pageMounted, setPageMounted] = useState(false);
    const [assetsReady, setAssetsReady] = useState(isMobile);

    useEffect(() => {
        if (isMobile){
            setPageMounted(true);
        }
        else{
            const t = setTimeout(() => {
                setPageMounted(true);
            }, 4650);
    
            return () => clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const assets = [
            "/assets/events/scroll-handle-top.webp",
            "/assets/events/scroll-handle-bottom.webp",
            "/assets/events/scroll-paper.webp",
            "/assets/events/back.webp",
            "/assets/branch.webp",
            "/assets/lantern.webp",
            "/assets/flower.webp",
            "/assets/birdie.webp",
            "/assets/birdie_fly_up.webp",
            "/assets/birdie_fly_down.webp",
            "/assets/passBrushstroke.webp",
            "/assets/about_background.webp",
            "/assets/about_IIITD_asset.webp",
            "/assets/about_logo.webp",
            "/assets/events/events-bg.webp",
            "/assets/footer.jpeg",
            "/assets/heroTitle.svg",
            "/assets/26_mobile.svg",
            "/assets/Esummit_mobile.svg",
            "/assets/events/window-left-panel.webp",
            "/assets/events/window-right-panel.webp",
            "/assets/events/window-subtract.webp",
            "/assets/unstopPanel.webp",
            "/assets/easeMyTripPanel.webp",
            "/assets/team/background.webp",
            "/assets/team/left-bg.webp",
            "/assets/team/right-bg.webp",
            "/assets/team/tori-gate.webp",
            "/assets/zonals_background.webp",
            "/assets/zonals_timeline.webp",

            "/members/background.webp",
            "/members/background2.webp",
            "/members/bg-layer.webp",
            "/members/bg.webp",
            "/members/hut-layer.webp",
            "/members/menu.webp",
            "/members/rocks-layer.webp",
            "/members/speaker1.webp",
            "/members/speaker2.webp",
            "/members/speaker3.webp",

            ...Array.from({ length: 25 }, (_, i) => `/members/${i + 1}.webp`)
        ];

        const loadImage = (src: string) =>
            new Promise<void>((resolve) => {
                const img = new Image();
                img.src = src;

                if (img.decode) {
                    img.decode().catch(() => {}).finally(() => resolve());
                } else {
                    img.onload = img.onerror = () => resolve();
                }
            });

        const batchSize = 8;

        const loadBatches = async () => {
            for (let i = 0; i < assets.length; i += batchSize) {
                const batch = assets.slice(i, i + batchSize);
                await Promise.all(batch.map(loadImage));
            }
            setAssetsReady(true);
        };

        loadBatches();
    }, []);

    useEffect(() => {
        document.body.style.overflow = loaderDone ? "auto" : "hidden";
    }, [loaderDone]);

    const handleLoaderFinish = () => {
        if (assetsReady) {
            setLoaderDone(true);
        } else {
            const wait = setInterval(() => {
                if (assetsReady) {
                    setLoaderDone(true);
                    clearInterval(wait);
                }
            }, 30);
        }
    };

    useEffect(() => {
        if (pageMounted) {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }
    }, [pageMounted]);

    return (
        <>
            <Analytics />

            {!loaderDone && !isMobile && <Loader onFinish={handleLoaderFinish} />}

            {pageMounted && (
                <BrowserRouter>
                    <LenisProvider>
                        <DoorController />
                    </LenisProvider>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;