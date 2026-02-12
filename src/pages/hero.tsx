import twentySix from "../assets/heroTitle.svg";
import passBrushstroke from "../assets/passBrushstroke.png";
import { forwardRef } from "react";


const Hero = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <>
      <div ref={ref} className="min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.png')" }}/>

      <div className="absolute bottom-5 left-30">
        <div className="flex items-center justify-center flex-col">
          <img src={twentySix} alt="26" className="w-lg" />
          <div className="w-96 flex items-center justify-center">
            <img src={passBrushstroke} alt="" />
            <a href="/pass" className="align-middle absolute inset-0 flex items-center justify-center top-50 font-normal font-['Akumaru'] text-[43.5288px] leading-14.25 text-center capitalize text-[#98440C]"> Get Your Pass</a>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background1.png')" }} />
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background1.png')" }} />
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background1.png')" }} />
    </>
  );
});
export default Hero;
