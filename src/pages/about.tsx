import React from "react";
import bg from "../assets/about_background.png";
import building from "../assets/about_IIITD_asset.png";
import logo from "../assets/about_logo.png";

const About: React.FC = () => {
  return (
    <section
      className="w-full h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
<div className="absolute left-[12%] top-[55%] -translate-y-1/2 z-20 flex items-start gap-[60px]">

  {/* Vertical Line */}
  <div className="w-[3.5px] h-[500px] bg-[#7b3f00]" />

  {/* Text Block */}
  <div className="max-w-[540px] flex flex-col gap-[38px]">

    <h1
      className="uppercase text-[100px] leading-[1.1] tracking-[0.05em] text-[#371B2E]"
      style={{ fontFamily: "Akumaru" }}
    >
      ABOUT THE <br /> FESTIVAL
    </h1>

    <div
      className="text-[25px] leading-[40px] text-[#5a4a42] max-w-[500px]"
      style={{ fontFamily: "Calibri, sans-serif" }}
    >
      <p>
        PitchCafe Competitive Platforms For Students And Startups
        To Pitch Ideas To Investors For Funding.
        PitchCafe Competitive Platforms For Students And Startups
        To Pitch Ideas To Investors For Funding.
      </p>
    </div>

  </div>
</div>

{/* TOP LEFT LOGO */}
<img
  src={logo}
  alt="E-Summit logo"
  className="absolute top-[40px] left-[110px] w-[200px] z-30 object-contain select-none"
  draggable={false}
/>

      {/* BUILDING – MID LAYER */}
        <img
        src={building}
        alt="building"
        className="absolute right-0 bottom-[0%] w-[55%] max-w-none z-0 object-contain select-none"
        draggable={false}
        />
    </section>
  );
};



export default About;
