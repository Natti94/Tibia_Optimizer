import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/optimizer/form"
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
        <img className="background" src={assets.background} alt="Background" />
        <Nav />
        <Media />
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
