import { useState } from "react";
import Skills from "./components/character/skills";
import Equipments from "./components/character/items/equipments";
import Weapons from "./components/character/items/weapons";
import Runes from "./components/character/items/runes";
import "./index.css";

function App() {
  const [main, setMain] = useState({
    vocation: "",
    level: "",
    magic: "",
  });
  const [secondary, setSecondary] = useState({
    sword: "",
    axe: "",
    club: "",
    distance: "",
    shield: "",
  });
  const [equipment, setEquipment] = useState({});
  const [weapon, setWeapon] = useState({});

  const getMagicLevelBonus = () => {
    let bonus = 0;
    Object.values(equipment).forEach((item) => {
      if (item && item.skills && item.skills.magicLevel) {
        bonus += Number(item.skills.magicLevel);
      }
    });
    if (weapon && weapon.skills && weapon.skills.magicLevel) {
      bonus += Number(weapon.skills.magicLevel);
    }
    return bonus;
  };

  const effectiveMagicLevel =
    (parseInt(main.magic) || 0) + getMagicLevelBonus();

  return (
    <div className="app-container">
      <img className="background" src="background.png" alt="background" />
      <div className="content-wrapper">
        <img src="title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <h1>Character</h1>
          <Skills
            main={main}
            setMain={setMain}
            secondary={secondary}
            setSecondary={setSecondary}
          />
          <hr />
          <Equipments
            vocation={main.vocation}
            equipment={equipment}
            setEquipment={setEquipment}
          />
          <hr />
          <Weapons
            vocation={main.vocation}
            weapon={weapon}
            setWeapon={setWeapon}
          />
          <hr />
          <Runes character={{ ...main, magic: effectiveMagicLevel }} />
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
