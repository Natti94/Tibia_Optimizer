import { useState } from "react";
import Character from "./components/chartacter";
import Equipment from "./components/items/equipments";
import Weapon from "./components/items/weapons";
import Rune from "./components/items/runes";
import "./index.css";

function App() {
  const [vocation, setVocation] = useState("");

  return (
    <div className="app-container">
      <img className="background" src="background.png" alt="background" />
      <div className="content-wrapper">
        <img src="title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <Character vocation={vocation} setVocation={setVocation} />
          <hr />
          <Equipment vocation={vocation} />
          <hr />
          <Weapon vocation={vocation} />
          <hr />
          <Rune />
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
