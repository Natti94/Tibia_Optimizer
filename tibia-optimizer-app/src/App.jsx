import Character from "./components/character/chartacter";
import Weapon from "./components/item/weapon/weapon";
import Equipment from "./components/item/equipment/equipment";
import Rune from "./components/item/rune/rune";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <img className="background" src="background.png" alt="background" />
      <div className="content-wrapper">
        <img src="title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <Character />
          <hr />
          <Equipment />
          <hr />
          <Weapon />
          <hr />
          <Rune />
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
