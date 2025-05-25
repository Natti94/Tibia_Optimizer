import Creature from "./components/creature/creature";
import Equipment from "./components/item/equipment/equipment";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <img className="background" src="../public/background.png" alt="background" />
      <div className="content-wrapper">
        <img src="../public/title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <Equipment />
          <Creature />
        </div>
      </div>
    </div>
  );
}

export default App;
