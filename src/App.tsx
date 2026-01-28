import Hero from "./pages/hero";
import Petals from "./pages/Petals/petals";

function App() {
  return (
    <>
      <Hero />
      <Petals count={50} />
    </>
  );
}

export default App;