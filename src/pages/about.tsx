import randomImg from "../assets/flower.webp"

function About() {
  return (
    <>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background1.png')" }}>
            <img className="top-0 left-0" src={randomImg} alt="" />
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, officiis.</div>
        </div>
    </>
  )
}

export default About