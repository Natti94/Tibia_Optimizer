import { useState, useEffect } from "react";
import { equipmentList } from "../../../data/item/equipment/equipment";

// Placeholder equipment items for each slot
const placeholderEquipment = {
  helmet: ["helmet"],
  armor: ["armor"],
  leg: ["legs"],
  boot: ["boots"],
  amulet: ["amulet"],
  ring: ["ring"],
  trinket: ["trinket"],
  offhand: ["quiver/shield"], // Combined
};

function Equipment() {
  const [apiEquipment, setApiEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  const [equipment, setEquipment] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",
    trinket: "",
    offhand: "", // Combined
  });

  const [vocation, setVocation] = useState("");
  const [paladinMode, setPaladinMode] = useState("11.40+"); // "11.40+" or "before 11.40"

  const [totalArmor, setTotalArmor] = useState(0);
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});

  // Fetch equipment from API on mount
  useEffect(() => {
    setLoading(true);
    try {
      const items = Array.isArray(equipmentList)
        ? equipmentList
        : equipmentList.items || [];
      setApiEquipment(
        items.filter((item) => item.name && item.name.trim() !== "")
      );
    } catch {
      setApiEquipment([]);
    }
    setLoading(false);
  }, []);

  // Combine placeholder and API equipment, remove duplicates
  const getAllOptions = (type) => {
    const placeholders = placeholderEquipment[type] || [];
    let apiNames = [];
    if (type === "offhand") {
      // Combine both quiver and shield types
      apiNames = apiEquipment
        .filter(
          (item) =>
            item.type &&
            (item.type.toLowerCase() === "quiver" ||
              item.type.toLowerCase() === "shield") &&
            item.name
        )
        .map((item) => item.name);
    } else {
      apiNames = apiEquipment
        .filter(
          (item) => item.type && item.type.toLowerCase() === type && item.name
        )
        .map((item) => item.name);
    }
    return [
      ...placeholders,
      ...apiNames.filter((name) => !placeholders.includes(name)),
    ];
  };

  // Find selected equipment object (from API only)
  const getSelectedEquipmentObj = (type) =>
    apiEquipment.find((item) => item.name === equipment[type]);

  // Handle select change
  const handleChange = (field) => (event) => {
    setEquipment((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Calculate totals (API items only)
  const calculateTotals = () => {
    let armorSum = 0;
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(equipment).forEach((equipmentName) => {
      const selected = apiEquipment.find((item) => item.name === equipmentName);
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

  // Display properties for selected equipment (API only)
  const renderEquipmentProps = (type) => {
    const obj = getSelectedEquipmentObj(type);
    if (!obj) return null;
    return (
      <ul>
        {obj.armor !== undefined && <li>Armor: {obj.armor}</li>}
        {obj.resistanceAll !== undefined && (
          <li>All Resistance: {obj.resistanceAll}%</li>
        )}
        {obj.resistance &&
          Object.entries(obj.resistance).map(([element, value]) => (
            <li key={element}>
              {element}: {value}%
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Equipment</h1>
      {loading && <div>Loading...</div>}

      <label>
        Vocation:
        <br />
        <select value={vocation} onChange={(e) => setVocation(e.target.value)}>
          <option value="">Select vocation</option>
          <option value="knight">Knight</option>
          <option value="paladin">Paladin</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="druid">Druid</option>
        </select>
      </label>

      {/* Paladin mode switch */}
      {vocation === "paladin" && (
        <label>
          Paladin Equipment Mode:
          <select
            value={paladinMode}
            onChange={(e) => setPaladinMode(e.target.value)}
          >
            <option value="11.40+">
              11.40+ (Weapon + Quiver/Shield/Trinket)
            </option>
            <option value="before 11.40">
              Before 11.40 (Weapon + Ammunition only)
            </option>
          </select>
        </label>
      )}

      {/* Equipment selection */}
      <label>
        Helmet:
        <br />
        <select value={equipment.helmet} onChange={handleChange("helmet")}>
          <option value="">Select helmet</option>
          {getAllOptions("helmet").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("helmet")}
      </label>
      <label>
        Armor:
        <br />
        <select value={equipment.armor} onChange={handleChange("armor")}>
          <option value="">Select armor</option>
          {getAllOptions("armor").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("armor")}
      </label>
      <label>
        Legs:
        <br />
        <select value={equipment.leg} onChange={handleChange("leg")}>
          <option value="">Select legs</option>
          {getAllOptions("leg").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("leg")}
      </label>
      <label>
        Boots:
        <br />
        <select value={equipment.boot} onChange={handleChange("boot")}>
          <option value="">Select boots</option>
          {getAllOptions("boot").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("boot")}
      </label>
      <label>
        Amulet:
        <br />
        <select value={equipment.amulet} onChange={handleChange("amulet")}>
          <option value="">Select amulet</option>
          {getAllOptions("amulet").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("amulet")}
      </label>
      <label>
        Ring:
        <br />
        <select value={equipment.ring} onChange={handleChange("ring")}>
          <option value="">Select ring</option>
          {getAllOptions("ring").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("ring")}
      </label>
      <label>
        Trinket:
        <br />
        <select value={equipment.trinket} onChange={handleChange("trinket")}>
          <option value="">Select trinket</option>
          {getAllOptions("trinket").map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderEquipmentProps("trinket")}
      </label>

      {/* Paladin-specific equipment options */}
      {vocation === "paladin" && paladinMode === "11.40+" && (
        <label>
          Quiver/Shield:
          <br />
          <select value={equipment.offhand} onChange={handleChange("offhand")}>
            <option value="">Select quiver/shield</option>
            {getAllOptions("offhand").map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {renderEquipmentProps("offhand")}
        </label>
      )}

      {vocation === "paladin" && paladinMode === "before 11.40" && (
        <label>
          Ammunition:
          <select value={equipment.offhand} onChange={handleChange("offhand")}>
            <option value="">Select ammunition</option>
            {getAllOptions("offhand").map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {renderEquipmentProps("offhand")}
        </label>
      )}

      {/* Other vocations */}
      {vocation !== "paladin" && (
        <label>
          Quiver/Shield:
                 <br />
          <select value={equipment.offhand} onChange={handleChange("offhand")}>
            <option value="">Select quiver/shield</option>
            {getAllOptions("offhand").map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {renderEquipmentProps("offhand")}
        </label>
      )}

      <h3>Selected Equipment:</h3>
      <ul>
        <li>
          <strong>Helmet:</strong> {equipment.helmet || "None"}
        </li>
        <li>
          <strong>Armor:</strong> {equipment.armor || "None"}
        </li>
        <li>
          <strong>Legs:</strong> {equipment.leg || "None"}
        </li>
        <li>
          <strong>Boots:</strong> {equipment.boot || "None"}
        </li>
        <li>
          <strong>Amulet:</strong> {equipment.amulet || "None"}
        </li>
        <li>
          <strong>Ring:</strong> {equipment.ring || "None"}
        </li>
        <li>
          <strong>Trinket:</strong> {equipment.trinket || "None"}
        </li>
        <li>
          <strong>Quiver/Shield:</strong> {equipment.offhand || "None"}
        </li>
      </ul>

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
  );
}

export default Equipment;
