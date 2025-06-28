import { useState, useEffect } from "react";
import { fetchItemList } from "../../../services/item/item";

// Placeholder equipment items for each slot
const placeholderEquipment = {
  helmet: ["helmet"],
  armor: ["armor"],
  leg: ["legs"],
  boot: ["boots"],
  amulet: ["amulet"],
  ring: ["ring"],
  trinket: ["trinket"],
  quiver: ["quiver"],
};

function Equipment() {
  const [apiEquipment, setApiEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Fetch equipment from API on mount
  useEffect(() => {
    setLoading(true);
    fetchItemList()
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || [];
        setApiEquipment(
          items.filter((item) => item.name && item.name.trim() !== "")
        );
      })
      .catch((err) => setError(err.message || "Failed to load items"))
      .finally(() => setLoading(false));
  }, []);

  // Combine placeholder and API equipment, remove duplicates
  const getAllOptions = (type) => {
    const placeholders = placeholderEquipment[type] || [];
    const apiNames = apiEquipment
      .filter(
        (item) => item.type && item.type.toLowerCase() === type && item.name
      )
      .map((item) => item.name);
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
      <h1>Equipment Setup</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <label>
        Helmet:
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
