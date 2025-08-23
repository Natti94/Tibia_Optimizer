import { useState } from "react";
import Character from "./components/chartacter";
import Equipment from "./components/character/equipments";
import Weapon from "./components/character/weapons";
import Rune from "./components/character/runes";
import "./index.css";

function App() {
  const [vocation, setVocation] = useState("");
  const [character, setCharacter] = useState({
    vocation: "",
    level: "",
    magic: "",
    skill: {
      sword: "",
      axe: "",
      club: "",
      distance: "",
      shield: "",
    },
  });
  const [equipment, setEquipment] = useState({});
  const [weapon, setWeapon] = useState({});

  // Calculate total +magic level from equipment and weapon
  const getMagicLevelBonus = () => {
    let bonus = 0;
    // Sum equipment bonuses
    Object.values(equipment).forEach((item) => {
      if (item && item.skills && item.skills.magicLevel) {
        bonus += Number(item.skills.magicLevel);
      }
    });
    // Add weapon bonus
    if (weapon && weapon.skills && weapon.skills.magicLevel) {
      bonus += Number(weapon.skills.magicLevel);
    }
    return bonus;
  };

  const effectiveMagicLevel =
    (parseInt(character.magic) || 0) + getMagicLevelBonus();

  return (
    <div className="app-container">
      <img className="background" src="background.png" alt="background" />
      <div className="content-wrapper">
        <img src="title.png" alt="Tibia Optimizer" className="app-title" />
        <div className="main-card">
          <Character
            vocation={vocation}
            setVocation={setVocation}
            character={character}
            setCharacter={setCharacter}
          />
          <hr />
          <Equipment
            vocation={vocation}
            equipment={equipment}
            setEquipment={setEquipment}
          />
          <hr />
          <Weapon
            vocation={vocation}
            weapon={weapon}
            setWeapon={setWeapon}
          />
          <hr />
          <Rune
            character={{ ...character, magic: effectiveMagicLevel }}
            // pass effectiveMagicLevel if you want
          />
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
