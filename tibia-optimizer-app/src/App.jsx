import Weapon from "./components/item/weapon/weapon";
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
        src="/tibia-optimizer-app/public/background.jpg"
        alt="background"
      />
      <div className="content-wrapper">
        <img
          src="/tibia-optimizer-app/public/title.png"
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
