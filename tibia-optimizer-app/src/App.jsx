import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import About from "./components/nav/pages/about";
import Support from "./components/nav/pages/support";
import Form from "./components/optimizer/form";
import "./index.css";

const background = import.meta.env.VITE_CLOUDINARY_BACKGROUND;

function App() {
  return (
    <>
      <BrowserRouter>
        <img className="background" src={background} alt="Background" />
        <Nav />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
