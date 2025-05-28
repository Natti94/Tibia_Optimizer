import { useState, useEffect } from "react";
import { weaponList } from "../../../data/item/weapon/weapon";
function Weapon() {
  const [weapon, setWeapon] = useState({
    sword: "",
    axe: "",
    club: "",
    crossbow: "",
    bow: "",
    throw: "",
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
    let attackSpecificSum = {};
    let wandDamageSum = {};
    let rodDamageSum = {};
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(weapon).forEach((weaponName) => {
      const selected = weaponList.find(
        (theWeapon) => theWeapon.name === weaponName
      );

      if (!selected) return;
      attackSum += selected.attack || 0;
      if (selected.attackSpecific) {
        Object.entries(selected.attackSpecific).forEach(([element, value]) => {
          attackSpecificSum[element] =
            (attackSpecificSum[element] || 0) + value;
        });
      }
      if (selected.wandDamage) {
        Object.entries(selected.wandDamage || selected.WandDamage).forEach(
          ([element, value]) => {
            wandDamageSum[element] = (wandDamageSum[element] || 0) + value;
          }
        );
      }
      if (selected.rodDamage) {
        Object.entries(selected.rodDamage || selected.rodDamage).forEach(
          ([element, value]) => {
            rodDamageSum[element] = (rodDamageSum[element] || 0) + value;
          }
        );
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
    setTotalSpecificAttack(attackSpecificSum);
    setTotalWandDamage(wandDamageSum);
    setTotalRodDamage(rodDamageSum);
    setTotalAllResistance(resistanceOverallSum);
    setTotalSpecificResistance(resistanceSpecificSum);
  };

  return (
    <div>
      <h2>Weapon Calculator</h2>
      <label>
        <select value={weapon.sword} onChange={handleChange("weapon")}>
          <option value="">Select a weapon</option>
          {getWeaponsByType("weapon").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
              {slot.attackSpecific
                ? Object.entries(slot.attackSpecific)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
              {getWeaponsByType("wand").length > 0 && slot.wandDamage
                ? Object.entries(slot.wandDamage)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
              {getWeaponsByType("rod").length > 0 && slot.rodDamage
                ? Object.entries(slot.rodDamage)
                    .map(([element, value]) => ` ${element}: ${value}`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label></label>
      <div>
        <h3>Selected Weapon:</h3>
        <div>
          <p>
            <strong>Weapon:</strong> {weapon.weapon || "None"}
          </p>
        </div>
        <div>
          <br />
          <h3>Calculate Offense:</h3>
          <button className="calculate-button" onClick={calculateTotals}>
            =
          </button>
          <p>
            <strong>Total Attack: {totalAttack}</strong>
          </p>
          <p>
            <strong>Total Specific Attack: </strong>
          </p>
          <ul>
            {Object.entries(totalSpecificAttack).map(([element, value]) => (
              <li key={element}>
                {element}: {value}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Wand Damage: </strong>
          </p>
          <ul>
            {Object.entries(totalWandDamage).map(([element, value]) => (
              <li key={element}>
                {element}: {value}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Rod Damage: </strong>
          </p>
          <ul>
            {Object.entries(totalRodDamage).map(([element, value]) => (
              <li key={element}>
                {element}: {value}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total All Resistance: </strong>
            {totalAllResistance}%
          </p>
          <p>
            <strong>Element Specific Resistance: </strong>
          </p>
          <ul>
            {Object.entries(totalSpecificResistance).map(([element, value]) => (
              <li key={element}>
                {element}: {value}%
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Weapon;
