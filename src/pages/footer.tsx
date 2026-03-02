import { useContext } from "react";
import { LenisContext } from "../contexts/LenisContext";

const Footer = () => {
    const { scrollTo } = useContext(LenisContext);

    const handleNavClick = (target: string) => {
        scrollTo(target);
    };

    const navLinks = [
        { name: "Home", target: "#home" },
        { name: "Speakers", target: "#speakers" },
        { name: "Events", target: "#events" },
        { name: "Team", target: "#team" },
    ];

    return (
        <footer className="relative overflow-hidden rounded-t-xl" style={{ background: "linear-gradient(to bottom, #2a1a1f 0%, #1a0f12 100%)" }}>
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e488b0] to-transparent opacity-60" />

            <div className="relative w-full px-6 md:px-12 lg:px-16 py-8">
                {/* Main Content - Four Column Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* 1. E-SUMMIT */}
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-[#e488b0] to-[#7b3f00] opacity-40" />
                                <img
                                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=80&h=80&fit=crop"
                                    alt="E-Summit 2026 Logo"
                                    className="relative w-12 h-12 rounded-lg object-cover border-2 border-[#7b3f00]/60"
                                />
                            </div>
                            <div>
                                <h3 className="text-3xl tracking-wider text-[#e488b0]" style={{ fontFamily: "Akumaru" }}>
                                    E-SUMMIT
                                </h3>
                                <p className="text-[#98440C] text-lg tracking-widest font-bold">2026</p>
                            </div>
                        </div>
                        <p className="text-[#d4a574] text-lg max-w-sm leading-relaxed">
                            Where innovation blooms and entrepreneurial spirits flourish
                        </p>
                    </div>

                    {/* 2. NAVIGATE */}
                    <div className="flex flex-col items-start gap-3">
                        <h4 className="text-[#e488b0] text-2xl tracking-widest" style={{ fontFamily: "Akumaru" }}>
                            NAVIGATE
                        </h4>
                        <nav className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.target)}
                                    className="text-[#d4a574] hover:text-[#e488b0] text-lg transition-colors duration-300 text-left"
                                    style={{ fontFamily: "Akumaru" }}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* 3. CONTACT */}
                    <div className="flex flex-col items-start gap-3">
                        <h4 className="text-[#e488b0] text-2xl tracking-widest" style={{ fontFamily: "Akumaru" }}>
                            CONTACT
                        </h4>
                        <a
                            href="mailto:esummit@iiitd.ac.in"
                            className="text-[#d4a574] hover:text-[#e488b0] text-lg transition-colors duration-300"
                        >
                            esummit@iiitd.ac.in
                        </a>
                        <div className="flex gap-4 mt-1">
                            {[
                                { label: "Instagram", href: "https://www.instagram.com/esummit_iiitd/?hl=en" },
                                { label: "Unstop", href: "https://unstop.com/college-fests/e-summit25-iiit-delhi-iiit-delhi-345569" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/company/entrepreneurship-summit-iiit-delhi?originalSubdomain=in" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    className="text-[#d4a574] hover:text-[#e488b0] text-base transition-colors duration-300"
                                    style={{ fontFamily: "Akumaru" }}
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 4. MAP */}
                    <div className="flex flex-col items-start gap-3">
                        <h4 className="text-[#e488b0] text-2xl tracking-widest" style={{ fontFamily: "Akumaru" }}>
                            LOCATE US
                        </h4>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7958923239635!2d77.2705959121087!3d28.54585407561092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e564daac1d%3A0x2c582e340e7bc556!2sIndraprastha%20Institute%20of%20Information%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1772466534183!5m2!1sen!2sin" 
                            width="100%" 
                            height="150" 
                            style={{border: "0"}} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade" 
                            className="rounded-lg max-w-[250px]"
                        ></iframe>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-5 border-t border-[#7b3f00]/30 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-[#8a7a72] text-base">
                        © 2026 E-Summit IIITD. All rights reserved.
                    </p>
                    <p className="text-[#8a7a72] text-base flex items-center gap-2">
                        Made with <span className="text-[#e488b0] animate-pulse">❤</span> by{" "}
                        <span className="text-[#d4a574]" style={{ fontFamily: "Akumaru" }}>WebDev Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;