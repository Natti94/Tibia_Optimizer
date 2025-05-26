import { useState, useEffect } from "react";
import { itemList } from "../data/equipment";

function Equipment() {
  const [item, setItem] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",
  });
  const [totalArmor, setTotalArmor] = useState(0);
  const [totalResistance, setTotalResistance] = useState({});
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [option, setOption] = useState(null);
  useEffect(() => {
    setOption(itemList);
  }, []);

  const handleChange = (field) => (event) => {
    setItem((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const getItemsByType = (type) => {
    return option ? option.filter((item) => item.type === type) : [];
  };

  const calculateTotals = () => {
    let armorSum = 0;
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(item).forEach((itemName) => {
      const selected = itemList.find((theItem) => theItem.name === itemName);
      if (!selected) return;
      armorSum += selected.armor || 0;
      if (selected.resistanceAll) {
        resistanceOverallSum += selected.resistanceAll;
      }
      if (selected.resistance) {
        Object.entries(selected.resistance).forEach(([element, value]) => {
          resistanceSpecificSum[element] += value;
        });
      }
    });

    setTotalArmor(armorSum);
    setTotalAllResistance(resistanceOverallSum);
    setTotalResistance(resistanceSpecificSum);
  };

  return (
    <div>
      <h2>Defense Calculator</h2>
      <label>
        <select value={item.helmet} onChange={handleChange("helmet")}>
          <option value="">Select a helmet</option>
          {getItemsByType("helmet").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={item.armor} onChange={handleChange("armor")}>
          <option value="">Select an armor</option>
          {getItemsByType("armor").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={item.leg} onChange={handleChange("leg")}>
          <option value="">Select legs</option>
          {getItemsByType("leg").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={item.boot} onChange={handleChange("boot")}>
          <option value="">Select boots</option>
          {getItemsByType("boot").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={item.amulet} onChange={handleChange("amulet")}>
          <option value="">Select an amulet</option>
          {getItemsByType("ring").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={item.ring} onChange={handleChange("ring")}>
          <option value="">Select a ring</option>
          {getItemsByType("ring").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <div>
        <h3>Selected Equipment</h3>
        <div className="selected-equipment">
          <p>
            <strong>Helmet:</strong> {item.helmet || "None"}
          </p>
          <p>
            <strong>armor:</strong> {item.armor || "None"}
          </p>
          <p>
            <strong>Legs:</strong> {item.leg || "None"}
          </p>
          <p>
            <strong>Boots:</strong> {item.boot || "None"}
          </p>
          <p>
            <strong>Amulet:</strong> {item.amulet || "None"}
          </p>
          <p>
            <strong>Ring:</strong> {item.ring || "None"}
          </p>
          <div>
            <hr />
            <h3>Calculate Defense:</h3>
            <button onClick={calculateTotals}>Calculate</button>
            <p>
              <strong>Total Armor: </strong>
              {totalArmor}
            </p>
            <p>
              <strong>Total All Resistance: </strong>
              {totalAllResistance}%
            </p>
            <p>
              <strong>Element Specific Resistance: </strong>
            </p>
            <ul>
              {Object.entries(totalResistance).map(([element, value]) => (
                <li key={element}>
                  {element}: {value}%
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Equipment;
