import React from "react";
import bg from "../assets/zonals_background.webp";
import timeline from "../assets/zonals_timeline.webp"; 

const Zonals: React.FC = () => {
  return (
    <section
      id="zonals"
      className="w-full min-h-screen relative overflow-hidden -mt-60"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={timeline}
        alt="zonals timeline"
        className="absolute left-[18%] top-1/2 -translate-y-1/2 w-[33%] max-w-none z-10 object-contain select-none"
        draggable={false}
      />

      <h1
        className="absolute right-[15%] top-[50%] -translate-y-1/2 text-[110px] text-[#371B2E] uppercase z-20"
        style={{ fontFamily: "Akumaru" }}
      >
        ZONALS
      </h1>
    </section>
  );
};

export default Zonals;
