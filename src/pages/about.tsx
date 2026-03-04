import React from "react";
import bg from "../assets/about_background.webp";
import building from "../assets/about_IIITD_asset.webp";
import logo from "../assets/about_logo.webp";
import "../styles/about.css";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="about-section w-full min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text Content - Top Left on mobile */}
      <div className="about-content absolute left-[12%] top-[55%] -translate-y-1/2 z-20 flex items-start gap-15 md:left-[12%] md:top-[55%]">
        {/* Vertical Line */}
        <div className="about-line w-[3.5px] h-125 bg-[#7b3f00]" />

        {/* Text Block */}
        <div className="about-text-block max-w-135 flex flex-col gap-9.5">
          <h1
            className="about-title uppercase text-[100px] leading-[1.1] tracking-[0.05em] text-[#371B2E]"
            style={{ fontFamily: "Akumaru" }}
          >
            ABOUT THE <br /> FESTIVAL
          </h1>

          <div
            className="about-description text-[20px] leading-10 text-[#5a4a42] max-w-125"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            <p>
              E-Summit at IIIT Delhi is a vibrant hub where innovators, founders, investors, and aspiring entrepreneurs come together to share ideas and spark innovation. Through startup pitches, talks, competitions, and networking, it creates a platform for bold ideas to grow and the next generation of entrepreneurs to take shape.
            </p>
          </div>
        </div>
      </div>

      {/* TOP LEFT LOGO */}

        <img
          src={logo}
          alt="E-Summit logo"
          className="logo absolute top-10 left-27.5 w-50 z-30 object-contain select-none"
          draggable={false}
        />

      {/* BUILDING – Bottom Right */}
      <img
        src={building}
        alt="building"
        className="about-building absolute right-0 bottom-[0%] w-[55%] max-w-none z-0 object-contain select-none"
        draggable={false}
      />
    </section>
  );
};

export default About;
