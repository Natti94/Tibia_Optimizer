import { useState } from "react";
import Skills from "./components/character/skills";
import Equipments from "./components/character/items/equipments";
import Weapons from "./components/character/items/weapons";
import Runes from "./components/character/items/runes";
import { equipmentList } from "./data/character/items/equipments";
import { weaponList } from "./data/character/items/weapons";
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
  const [equipment, setEquipment] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",
    trinket: "",
    offhand: "",
  });
  const [weapon, setWeapon] = useState({
    weapon: "",
    ammunition: "",
  });

  function forceCasing(str) {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  }

  let totalArmor = 0;
  let totalAllResistance = 0;
  let totalSpecificResistance = {};
  let skillSum = { ...secondary };
  let magicLevelBonus = 0;

  const addTo = (obj, key, value) => {
    obj[key] = (parseInt(obj[key]) || 0) + (parseInt(value) || 0);
  };

  const selectedEquipments = Object.values(equipment)
    .map((name) => equipmentList.find((item) => item.name === name))
    .filter(Boolean);

  selectedEquipments.forEach((item) => {
    totalArmor += item.armor || 0;
    if (item.resistanceAll) totalAllResistance += item.resistanceAll;
    if (item.resistance) {
      Object.entries(item.resistance).forEach(([element, value]) => {
        addTo(totalSpecificResistance, element, value);
      });
    }
    if (item.skills) {
      Object.entries(item.skills).forEach(([skill, value]) => {
        addTo(skillSum, skill, value);
        if (skill === "magicLevel") magicLevelBonus += value;
      });
    }
  });

  const selectedWeaponObj = weaponList.find(
    (item) => item.name === weapon.weapon
  );
  if (selectedWeaponObj) {
    if (selectedWeaponObj.attack)
      addTo(skillSum, "attack", selectedWeaponObj.attack);
    if (selectedWeaponObj.damage)
      addTo(skillSum, "damage", selectedWeaponObj.damage);
    if (selectedWeaponObj.resistance) {
      Object.entries(selectedWeaponObj.resistance).forEach(
        ([element, value]) => {
          addTo(totalSpecificResistance, element, value);
        }
      );
    }
    if (selectedWeaponObj.skills) {
      Object.entries(selectedWeaponObj.skills).forEach(([skill, value]) => {
        addTo(skillSum, skill, value);
        if (skill === "magicLevel") magicLevelBonus += value;
      });
    }
  }

  const effectiveMagicLevel = (parseInt(main.magic) || 0) + magicLevelBonus;

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
          <h1>Encounter</h1>
          <Runes character={{ ...main, magic: effectiveMagicLevel }} />

          <hr />
          <div className="equipment-summary">
            <h3>Character Summary</h3>
            <div className="equipment-grid">
              <p>
                <strong>Vocation:</strong>{" "}
                {forceCasing(main.vocation) || "None"}
              </p>
              <p>
                <strong>Level:</strong> {main.level || "None"}
              </p>
              <p>
                <strong>Magic Level:</strong> {main.magic || "None"}
              </p>
              <p>
                <strong>Effective Magic Level:</strong> {effectiveMagicLevel}
              </p>
              <p>
                <strong>Weapon:</strong> {weapon.weapon || "None"}
              </p>
              <p>
                <strong>Ammunition:</strong> {weapon.ammunition || "None"}
              </p>
              <p>
                <strong>Helmet:</strong> {equipment.helmet || "None"}
              </p>
              <p>
                <strong>Armor:</strong> {equipment.armor || "None"}
              </p>
              <p>
                <strong>Legs:</strong> {equipment.leg || "None"}
              </p>
              <p>
                <strong>Boots:</strong> {equipment.boot || "None"}
              </p>
              <p>
                <strong>Amulet:</strong> {equipment.amulet || "None"}
              </p>
              <p>
                <strong>Ring:</strong> {equipment.ring || "None"}
              </p>
              <p>
                <strong>Trinket:</strong> {equipment.trinket || "None"}
              </p>
              <p>
                <strong>Offhand:</strong> {equipment.offhand || "None"}
              </p>
            </div>
            <h4>Totals</h4>
            <ul>
              <li>
                <strong>Total Armor:</strong> {totalArmor}
              </li>
              <li>
                <strong>Total All Resistance:</strong> {totalAllResistance}%
              </li>
              <li>
                <strong>Element Specific Resistance:</strong>
                <ul>
                  {Object.entries(totalSpecificResistance).map(
                    ([element, value]) => (
                      <li key={element}>
                        {forceCasing(element)}: {value}%
                      </li>
                    )
                  )}
                </ul>
              </li>
              <li>
                <strong>Skill Sum:</strong>
                <ul>
                  {Object.entries(skillSum).map(([skill, value]) => (
                    <li key={skill}>
                      {forceCasing(skill)}: {value}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
