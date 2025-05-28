import { useState, useEffect } from "react";
import { equipmentList } from "../../../data/item/equipment/equipment";

function Equipment() {
  const [equipment, setEquipment] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",

  });
  const [totalArmor, setTotalArmor] = useState(0);
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});
  const [option, setOption] = useState(null);

  useEffect(() => {
    setOption(equipmentList);
  }, []);
  const handleChange = (field) => (event) => {
    setEquipment((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const getEquipmentByType = (type) => {
    return option ? option.filter((equipment) => equipment.type === type) : [];
  };

  const calculateTotals = () => {
    let armorSum = 0;
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(equipment).forEach((equipmentName) => {
      const selected = equipmentList.find(
        (theequipment) => theequipment.name === equipmentName
      );
      if (!selected) return;
      armorSum += selected.armor || 0;
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

    setTotalArmor(armorSum);
    setTotalAllResistance(resistanceOverallSum);
    setTotalSpecificResistance(resistanceSpecificSum);
  };

  return (
    <div>
      <h2>Defense Calculator</h2>
      <label>
        <select value={equipment.helmet} onChange={handleChange("helmet")}>
          <option value="">Select a helmet</option>
          {getEquipmentByType("helmet").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <select value={equipment.armor} onChange={handleChange("armor")}>
          <option value="">Select an armor</option>
          {getEquipmentByType("armor").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <select value={equipment.leg} onChange={handleChange("leg")}>
          <option value="">Select legs</option>
          {getEquipmentByType("leg").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <select value={equipment.boot} onChange={handleChange("boot")}>
          <option value="">Select boots</option>
          {getEquipmentByType("boot").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <select value={equipment.amulet} onChange={handleChange("amulet")}>
          <option value="">Select an amulet</option>
          {getEquipmentByType("ring").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <select value={equipment.ring} onChange={handleChange("ring")}>
          <option value="">Select a ring</option>
          {getEquipmentByType("ring").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.armor ? ` - (armor: ${slot.armor})` : ""}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
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
        <h3>Selected Equipment:</h3>
        <div>
          <p>
            <strong>Helmet:</strong> {equipment.helmet || "None"}
          </p>
          <p>
            <strong>armor:</strong> {equipment.armor || "None"}
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
        </div>
        <div>
          <br />
          <h3>Calculate Defense:</h3>
          <button className="calculate-button" onClick={calculateTotals}>
            =
          </button>
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
            {Object.entries(totalSpecificResistance).map(([element, value]) => (
              <li key={element}>
                {element}: {value}%
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Equipment;
