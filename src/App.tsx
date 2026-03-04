import { useRef, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LenisProvider } from "./contexts/LenisContext";

import Navbar from "./components/Navbar/navbar";
import Petals from "./components/Petals/petals";
import Hero from "./pages/hero";
import About from "./pages/about";
import Events from "./pages/events";
import Speakers from "./pages/speakers";
import Sponsors from "./pages/sponsors";
import Zonals from "./pages/zonals";
import AllEvents from "./pages/allEvents";
import Footer from "./pages/footer";
import TeamPage from "./pages/TeamPage";
import Loader from "./pages/loader";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    const heroRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <Navbar heroRef={heroRef} />
            <Hero ref={heroRef} />
            <About />
            <Zonals />
            <Events />
            <Speakers />
            <Sponsors />
            <Petals count={50} />
            <Footer />
        </>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    return (
        <>
            {loading && <Loader onFinish={() => setLoading(false)} />}

            <BrowserRouter>
                <LenisProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route
                            path="/all-events"
                            element={
                                <>
                                    <AllEvents />
                                    <Petals count={50} />
                                </>
                            }
                        />

                        <Route
                            path="/team"
                            element={
                                <>
                                    <TeamPage />
                                    <Petals count={50} />
                                </>
                            }
                        />
                    </Routes>
                </LenisProvider>
            </BrowserRouter>
        </>
    );
}

export default App;