import { useState } from "react";
import { fetchItemList } from "../../../services/item/item";

function Weapon() {
  const weaponTypes = [
    "sword",
    "axe",
    "club",
    "crossbow",
    "bow",
    "throw",
    "wand",
    "rod",
  ];

  const [weapon, setWeapon] = useState(
    Object.fromEntries(weaponTypes.map((type) => [type, ""]))
  );

  const [totals, setTotals] = useState({
    attack: 0,
    attackSpecific: {},
    wandDamage: {},
    rodDamage: {},
    resistanceAll: 0,
    resistanceSpecific: {},
  });

  const handleChange = (type) => (event) => {
    setWeapon((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const calculateTotals = () => {
    let attackSum = 0;
    let attackSpecificSum = {};
    let wandDamageSum = {};
    let rodDamageSum = {};
    let resistanceAllSum = 0;
    let resistanceSpecificSum = {};

    Object.entries(weapon).forEach(([type, name]) => {
      if (!name) return;
      const list = fetchItemList[type] || [];
      const selected = list.find((item) => item.name === name);
      if (!selected) return;

      attackSum += selected.attack || 0;

      if (selected.attackSpecific) {
        for (const [element, value] of Object.entries(
          selected.attackSpecific
        )) {
          attackSpecificSum[element] =
            (attackSpecificSum[element] || 0) + value;
        }
      }

      if (selected.wandDamage) {
        for (const [element, value] of Object.entries(selected.wandDamage)) {
          wandDamageSum[element] = (wandDamageSum[element] || 0) + value;
        }
      }

      if (selected.rodDamage) {
        for (const [element, value] of Object.entries(selected.rodDamage)) {
          rodDamageSum[element] = (rodDamageSum[element] || 0) + value;
        }
      }

      if (selected.resistanceAll) {
        resistanceAllSum += selected.resistanceAll;
      }

      if (selected.resistance) {
        for (const [element, value] of Object.entries(selected.resistance)) {
          resistanceSpecificSum[element] =
            (resistanceSpecificSum[element] || 0) + value;
        }
      }
    });

    setTotals({
      attack: attackSum,
      attackSpecific: attackSpecificSum,
      wandDamage: wandDamageSum,
      rodDamage: rodDamageSum,
      resistanceAll: resistanceAllSum,
      resistanceSpecific: resistanceSpecificSum,
    });
  };

  return (
    <div>
      <h2>Select Weapons</h2>
      {weaponTypes.map((type) => {
        const items = fetchItemList(type) || [];
        return (
          <div key={type}>
            <label style={{ textTransform: "capitalize" }}>{type}</label>
            <select value={weapon[type]} onChange={handleChange(type)}>
              <option value="">Select a {type}</option>
              {items.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                  {item.attack ? ` (Attack: ${item.attack})` : ""}
                  {item.attackSpecific
                    ? " (" +
                      Object.entries(item.attackSpecific)
                        .map(([e, v]) => `${e}: ${v}`)
                        .join(", ") +
                      ")"
                    : ""}
                  {item.wandDamage
                    ? " (" +
                      Object.entries(item.wandDamage)
                        .map(([e, v]) => `${e}: ${v}`)
                        .join(", ") +
                      ")"
                    : ""}
                  {item.rodDamage
                    ? " (" +
                      Object.entries(item.rodDamage)
                        .map(([e, v]) => `${e}: ${v}`)
                        .join(", ") +
                      ")"
                    : ""}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      <button className="calculate-button" onClick={calculateTotals}>
        =
      </button>

      <h3>Totals</h3>
      <p>
        <strong>Attack:</strong> {totals.attack}
      </p>

      <p>
        <strong>Specific Attack:</strong>
      </p>
      <ul>
        {Object.entries(totals.attackSpecific).map(([element, value]) => (
          <li key={element}>
            {element}: {value}
          </li>
        ))}
      </ul>

      <p>
        <strong>Wand Damage:</strong>
      </p>
      <ul>
        {Object.entries(totals.wandDamage).map(([element, value]) => (
          <li key={element}>
            {element}: {value}
          </li>
        ))}
      </ul>

      <p>
        <strong>Rod Damage:</strong>
      </p>
      <ul>
        {Object.entries(totals.rodDamage).map(([element, value]) => (
          <li key={element}>
            {element}: {value}
          </li>
        ))}
      </ul>

      <p>
        <strong>All Resistance:</strong> {totals.resistanceAll}%
      </p>

      <p>
        <strong>Element Specific Resistance:</strong>
      </p>
      <ul>
        {Object.entries(totals.resistanceSpecific).map(([element, value]) => (
          <li key={element}>
            {element}: {value}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weapon;
