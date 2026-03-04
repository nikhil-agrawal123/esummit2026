import unstop from '../assets/unstopPanel.webp'
import ease from '../assets/easeMyTripPanel.webp'
// import google from '../assets/googlePanel.webp'
// import stripe from '../assets/stripePanel.webp'
// import sequioa from '../assets/sequioaPanel.webp'
// import scroll from '../assets/scroll2.webp'
// import scrollBg from '../assets/scrollBg.webp'
// import Marquee from "react-fast-marquee";

function Sponsors() {
  return (
    <section id="sponsors" className="relative h-screen w-full">
      <img src="/bg.webp"  alt="Background" className="absolute inset-0 h-full w-full object-cover"/>
      <div className="relative flex justify-center items-start w-full h-full pt-12! pr-50!">
        <h2 className="text-8xl text-[#371B2E] font-[Akumaru]">
          Sponsors
        </h2>
      </div>
      <div className="marquee-div absolute flex left-0 top-50 justify-center items-center inset-0 z-40 h-[80vh] w-full scale-90 gap-5">
        <img className='rounded-4xl' src={unstop} width={538} height={336} alt="" />
        <img className='rounded-4xl' src={ease} width={538} height={336} alt="" />
        {/* <Marquee direction="right"  speed={60} pauseOnHover gradient={false} autoFill>
            <img src={google}  width={269} height={168} alt="" />
            <img src={stripe}  width={269} height={168} alt="" />
            <img src={sequioa} width={269} height={168} alt="" />
        </Marquee>

        <Marquee speed={60} pauseOnHover gradient={false} autoFill>
            <img src={google}  width={269} height={168} alt="" />
            <img src={stripe}  width={269} height={168} alt="" />
            <img src={sequioa} width={269} height={168} alt="" />
        </Marquee>

        <Marquee direction="right"  speed={60} pauseOnHover gradient={false} autoFill>
            <img src={google}  width={269} height={168} alt="" />
            <img src={stripe}  width={269} height={168} alt="" />
            <img src={sequioa} width={269} height={168} alt="" />
        </Marquee> */}

      </div>
      {/* <div className="absolute top-12 -left-25 z-40">
        <img src={scroll} className='w-[22vw] h-[110vh]' alt=""/>
      </div>
      <div className="absolute top-52 left-10 z-30">
        <img src={scrollBg} className='z-10! aspect-auto w-[2500px] h-[67vh]' alt="" />
      </div> */}
    </section>
  );
}

export default Sponsors;