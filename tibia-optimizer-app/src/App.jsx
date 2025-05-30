import Weapon from "./components/item/weapon/Weapon";
import Ammunition from "./components/item/ammunition/ammunition";
import Quiver from "./components/item/quiver/quiver";
import Equipment from "./components/item/equipment/equipment";
import Creature from "./components/encounter/creature/creature";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <img
        className="background"
        src="../public/background.png"
        alt="background"
      />
      <div className="content-wrapper">
        <img
          src="../public/title.png"
          alt="Tibia Optimizer"
          className="app-title"
        />
        <div className="main-card">
          <Weapon />
          <hr />
          <Ammunition />
                <hr />
          <Quiver />
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
