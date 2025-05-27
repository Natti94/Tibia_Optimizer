import { weaponList } from "../data/weapon";
import { useState, useEffect } from "react";
function Weapon() {
  const [weapon, setWeapon] = useState({
    sword: "",
    axe: "",
    club: "",
    crossbow: "",
    bow: "",
    throw: "",
    bolt: "",
    arrow: "",
    wand: "",
    rod: "",
  });
  const [totalAttack, setTotalAttack] = useState(0);
  const [totalSpecificAttack, setTotalSpecificAttack] = useState({});
  const [totalWandDamage, setTotalWandDamage] = useState({});
  const [totalRodDamage, setTotalRodDamage] = useState({});
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});
  const [option, setOption] = useState(null);

  useEffect(() => {
    setOption(weaponList);
  }, []);
  const handleChange = (field) => (event) => {
    setWeapon((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const getWeaponsByType = (type) => {
    return option ? option.filter((weapon) => weapon.type === type) : [];
  };

  const calculateTotals = () => {
    let attackSum = 0;
    let specificAttackSum = {};
    let wandDamageSum = {};
    let rodDamageSum = {};
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(weapon).forEach((weaponName) => {
      const selected = weaponList.find(
        (theweapon) => theweapon.name === weaponName
      );

      if (!selected) return;

      attackSum += selected.attack || 0;

      if (selected.attackSpecific) {
        Object.entries(selected.attackSpecific).forEach(([element, value]) => {
          specificAttackSum[element] =
            (specificAttackSum[element] || 0) + value;
        });
      }

      if (selected.wandDamage) {
        Object.entries(selected.wandDamage).forEach(([element, value]) => {
          wandDamageSum[element] = (wandDamageSum[element] || 0) + value;
        });
      }

      if (selected.rodDamage) {
        Object.entries(selected.rodDamage).forEach(([element, value]) => {
          rodDamageSum[element] = (rodDamageSum[element] || 0) + value;
        });
      }

      if (selected.resistanceAll) {
        resistanceOverallSum += selected.resistanceAll;
      }

      if (selected.resistance) {
        Object.entries(selected.resistance).forEach(([element, value]) => {
          resistanceSpecificSum[element] =
            (resistanceSpecificSum[element] || 0) + value;
        });
      }
    });

    setTotalAttack(attackSum);
    setTotalSpecificAttack(specificAttackSum);
    setTotalWandDamage(wandDamageSum);
    setTotalRodDamage(rodDamageSum);
    setTotalAllResistance(resistanceOverallSum);
    setTotalSpecificResistance(resistanceSpecificSum);
  };

  return (
    <div>
      <h2>Weapon Calculator</h2>
      <label>
        <select value={weapon.sword} onChange={handleChange("sword")}>
          <option value="">Select a sword</option>
          {getWeaponsByType("sword").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select value={weapon.axe} onChange={handleChange("axe")}>
          <option value="">Select an axe</option>
          {getWeaponsByType("axe").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select value={weapon.club} onChange={handleChange("club")}>
          <option value="">Select a club</option>
          {getWeaponsByType("club").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.crossbow} onChange={handleChange("crossbow")}>
          <option value="">Select a crossbow</option>
          {getWeaponsByType("crossbow").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.bow} onChange={handleChange("bow")}>
          <option value="">Select a bow</option>
          {getWeaponsByType("bow").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.throw} onChange={handleChange("throw")}>
          <option value="">Select a throwing weapon</option>
          {getWeaponsByType("throw").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.bolt} onChange={handleChange("bolt")}>
          <option value="">Select a bolt</option>
          {getWeaponsByType("bolt").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.arrow} onChange={handleChange("arrow")}>
          <option value="">Select an arrow</option>
          {getWeaponsByType("arrow").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select value={weapon.wand} onChange={handleChange("wand")}>
          <option value="">Select a wand</option>
          {getWeaponsByType("wand").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.wandDamage
                ? Object.entries(slot.wandDamage)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={weapon.rod} onChange={handleChange("rod")}>
          <option value="">Select a rod</option>
          {getWeaponsByType("rod").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.rodDamage
                ? Object.entries(slot.rodDamage)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <button onClick={calculateTotals}>Calculate Totals</button>
      <div>
        <h3>Total Attack: {totalAttack}</h3>
        <h3>Total Specific Attack:</h3>
        <ul>
          {Object.entries(totalSpecificAttack).map(([element, value]) => (
            <li key={element}>
              {element}: {value}
            </li>
          ))}
        </ul>
        <h3>Total Wand Damage:</h3>
        <ul>
          {Object.entries(totalWandDamage).map(([element, value]) => (
            <li key={element}>
              {element}: {value}
            </li>
          ))}
        </ul>
        <h3>Total Rod Damage:</h3>
        <ul>
          {Object.entries(totalRodDamage).map(([element, value]) => (
            <li key={element}>
              {element}: {value}
            </li>
          ))}
        </ul>
        <h3>Total All Resistance: {totalAllResistance}%</h3>
        <h3>Total Specific Resistance:</h3>
        <ul>
          {Object.entries(totalSpecificResistance).map(([element, value]) => (
            <li key={element}>
              {element}: {value}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Weapon;
