import Weapon from "./components/item/weapon/weapon";
import Equipment from "./components/item/equipment/equipment";
import Creature from "./components/encounter/creature/creature";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <img className="background" src="background.png" alt="background" />
      <div className="content-wrapper">
        <img src="title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <Weapon />
          <hr />
          <Equipment />
          <hr />
          <Creature />
        </div>
      </div>
    </div>
  );
}

export default App;
