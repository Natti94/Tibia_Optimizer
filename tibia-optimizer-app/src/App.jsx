import { BrowserRouter, Routes, Route } from "react-router-dom";
import Optimizer from "./components/optimizer/optimizer";
import Media from "./components/media/media";
import Nav from "./components/nav/nav";
import "./index.css";

const isProd = import.meta.env.PROD;

const assets = {
  background: isProd
    ? `/api/getAsset?assets=background`
    : import.meta.env.VITE_CLOUDINARY_BACKGROUND,
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Optimizer />} />
        </Routes>
        <img className="background" src={assets.background} alt="Background" />
        <Nav />
        <Media />
      </BrowserRouter>
    </>
  );
}

export default App;
