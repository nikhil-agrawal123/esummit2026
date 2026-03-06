import unstop from '../assets/unstopPanel.webp'
import ease from '../assets/easeMyTripPanel.webp'

function Sponsors() {
  return (
    <section id="sponsors" className="relative min-h-screen w-full overflow-hidden">
      <div className="relative flex justify-center items-start w-full h-full pt-8 md:pt-12!">
        <h2 className="text-5xl md:text-8xl text-[#371B2E] font-[Akumaru]">
          Sponsors
        </h2>
      </div>
      <div className="marquee-div absolute flex flex-col md:flex-row left-0 top-32 md:top-30 justify-center items-center inset-x-0 z-40 h-auto md:h-[80vh] w-full scale-100 md:scale-90 gap-4 md:gap-5 overflow-hidden px-4 md:px-0">
        <img className='rounded-2xl md:rounded-4xl w-[85%] md:w-auto max-w-134.5' src={unstop} alt="unstop" />
        <img className='rounded-2xl md:rounded-4xl w-[85%] md:w-auto max-w-134.5' src={ease} alt="easeMyTrip" />
      </div>
    </section>
  );
}

export default Sponsors;