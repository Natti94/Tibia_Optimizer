import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import About from "./pages/about";
import Support from "./pages/support";
import Form from "./components/Optimizer/form";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
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
