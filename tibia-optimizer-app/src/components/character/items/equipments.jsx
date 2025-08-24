import { useState, useEffect } from "react";
import { equipmentList } from "../../../data/character/items/equipments";

function Equipments({ vocation }) {
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

  const [paladinMode, setPaladinMode] = useState("12.5+");
  const [totalArmor, setTotalArmor] = useState(0);
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});
  const [skillSum, setSkillSum] = useState({});

  const placeholderEquipment = {
    helmet: ["helmet"],
    armor: ["armor"],
    leg: ["legs"],
    boot: ["boots"],
    amulet: ["amulet"],
    ring: ["ring"],
    trinket: ["trinket"],
    offhand: ["offhand"],
  };

  const forceCasing = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  const getAllOptions = (type) => {
    const placeholders = placeholderEquipment[type] || [];
    let data = Array.isArray(equipmentList) ? equipmentList : [];
    let apiNames = [];
    if (type === "offhand") {
      if (vocation === "paladin" && paladinMode === "12.5+") {
        apiNames = data
          .filter(
            (item) =>
              item.type && item.type.toLowerCase() === "quiver" && item.name
          )
          .map((item) => item.name);
      } else if (vocation === "paladin" && paladinMode === "before 12.5") {
        apiNames = [];
      } else if (vocation === "knight") {
        apiNames = data
          .filter(
            (item) =>
              item.type && item.type.toLowerCase() === "shield" && item.name
          )
          .map((item) => item.name);
      } else if (vocation === "sorcerer" || vocation === "druid") {
        apiNames = data
          .filter(
            (item) =>
              item.type && item.type.toLowerCase() === "spellbook" && item.name
          )
          .map((item) => item.name);
      } else {
        apiNames = data
          .filter(
            (item) =>
              item.type &&
              (item.type.toLowerCase() === "quiver" ||
                item.type.toLowerCase() === "shield") &&
              item.name
          )
          .map((item) => item.name);
      }
    } else {
      apiNames = data
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

  const getSelectedEquipmentObj = (type) =>
    (Array.isArray(equipmentList) ? equipmentList : []).find(
      (item) => item.name === equipment[type]
    );

  const handleChange = (field) => (event) => {
    setEquipment((prev) => ({ ...prev, [field]: event.target.value }));
  };

  useEffect(() => {
    let armorSum = 0;
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};
    let skillSumObj = {};

    Object.values(equipment).forEach((equipmentName) => {
      const selected = equipmentList.find(
        (item) => item.name === equipmentName
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
      if (selected.skills) {
        Object.entries(selected.skills).forEach(([element, value]) => {
          skillSumObj[element] = (skillSumObj[element] || 0) + (value || 0);
        });
      }
    });

    setTotalArmor(armorSum);
    setTotalAllResistance(resistanceOverallSum);
    setTotalSpecificResistance(resistanceSpecificSum);
    setSkillSum(skillSumObj);
  }, [equipment]);

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
              {forceCasing(element)}:{" "}
              {typeof value === "string" ? forceCasing(value) : value}%
            </li>
          ))}
        {obj.skills &&
          Object.entries(obj.skills).map(([element, value]) => (
            <li key={element}>
              {forceCasing(element)}:{" "}
              {typeof value === "string" ? forceCasing(value) : value}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Equipments</h2>
      {!vocation && (
        <div className="select-vocation-message">
          <strong>
            🛈 Please select a vocation to view and manage equipment.
          </strong>
        </div>
      )}
      <div className={`vocation-content${vocation ? " show" : ""}`}>
        {vocation && (
          <>
            <label>
              <h4>🛈 Your vocation has already been selected.</h4>
              <h5>
                This now displays the equipment options available for your
                vocation.
              </h5>
              <select value={vocation} disabled>
                <option value="">Select vocation</option>
                <option value="knight">Knight</option>
                <option value="paladin">Paladin</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="druid">Druid</option>
              </select>
            </label>
            {vocation === "paladin" && (
              <label>
                <br />
                Paladin Equipment Mode:
                <br />
                <select
                  value={paladinMode}
                  onChange={(e) => setPaladinMode(e.target.value)}
                >
                  <option value="12.5+">Tibia - V. 12.5+..</option>
                  <option value="before 12.5">
                    Tibia - V. 5.00.. - 12.4..
                  </option>
                </select>
              </label>
            )}
            <br />
            <br />
            <label>
              Helmet:
              <br />
              <select
                value={equipment.helmet}
                onChange={handleChange("helmet")}
              >
                <option value="">Select Helmet</option>
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
                <option value="">Select Armor</option>
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
                <option value="">Select Legs</option>
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
                <option value="">Select Boots</option>
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
              <select
                value={equipment.amulet}
                onChange={handleChange("amulet")}
              >
                <option value="">Select Amulet</option>
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
                <option value="">Select Ring</option>
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
              <select
                value={equipment.trinket}
                onChange={handleChange("trinket")}
              >
                <option value="">Select Trinket</option>
                {getAllOptions("trinket").map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {renderEquipmentProps("trinket")}
            </label>
            {vocation === "paladin" && paladinMode === "12.5+" && (
              <label>
                Quiver:
                <br />
                <select
                  value={equipment.offhand}
                  onChange={handleChange("offhand")}
                >
                  <option value="">Select Quiver</option>
                  {getAllOptions("offhand").map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {renderEquipmentProps("offhand")}
              </label>
            )}
            {vocation === "knight" && (
              <label>
                Shield:
                <br />
                <select
                  value={equipment.offhand}
                  onChange={handleChange("offhand")}
                >
                  <option value="">Select Shield</option>
                  {getAllOptions("offhand").map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {renderEquipmentProps("offhand")}
              </label>
            )}

            {(vocation === "sorcerer" || vocation === "druid") && (
              <label>
                Spellbook:
                <br />
                <select
                  value={equipment.offhand}
                  onChange={handleChange("offhand")}
                >
                  <option value="">Select Spellbook</option>
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
                <strong>
                  {vocation === "paladin"
                    ? paladinMode === "12.5+"
                      ? "Quiver"
                      : "Ammunition"
                    : vocation === "knight"
                    ? "Shield"
                    : "Spellbook"}
                  :
                </strong>{" "}
                {equipment.offhand || "None"}
              </li>
            </ul>
            <p>
              <strong>Total Armor: </strong>
              {totalArmor}
            </p>
            <p>
              <strong>Total All Resistance: </strong>
              {totalAllResistance}%
            </p>

            <h4>Element Specific Resistance</h4>
            <ul>
              {Object.entries(totalSpecificResistance).map(
                ([element, value]) => (
                  <li key={element}>
                    {forceCasing(element)}: {value}%
                  </li>
                )
              )}
            </ul>
            <h4>Skill Sum:</h4>
            <ul>
              {Object.entries(skillSum).map(([element, value]) => (
                <li key={element}>
                  {forceCasing(element)}: {value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Equipments;
