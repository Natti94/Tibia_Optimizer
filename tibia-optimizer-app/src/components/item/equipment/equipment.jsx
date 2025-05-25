import { useState, useEffect } from "react";
import { itemList } from "../../data/item";

function Equipment() {
  const [item, setItem] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",
  });
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

  return (
    <div>
      <label>
        Helmet:
        <select value={item.helmet} onChange={handleChange("helmet")}>
          <option value="">Select a helmet</option>
          {getItemsByType("helmet").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor})
            </option>
          ))}
        </select>
      </label>
      <label>
        Armor:
        <select value={item.armor} onChange={handleChange("armor")}>
          <option value="">Select an armor</option>
          {getItemsByType("armor").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor})
            </option>
          ))}
        </select>
      </label>
      <label>
        Legs:
        <select value={item.leg} onChange={handleChange("leg")}>
          <option value="">Select legs</option>
          {getItemsByType("leg").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor})
            </option>
          ))}
        </select>
      </label>
      <label>
        Boots:
        <select value={item.boot} onChange={handleChange("boot")}>
          <option value="">Select boots</option>
          {getItemsByType("boot").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor})
            </option>
          ))}
        </select>
      </label>
      <label>
        Amulet:
        <select value={item.amulet} onChange={handleChange("amulet")}>
          <option value="">Select an amulet</option>
          {getItemsByType("amulet").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor})
            </option>
          ))}
        </select>
      </label>
      <label>
        Ring:
        <select value={item.ring} onChange={handleChange("ring")}>
          <option value="">Select a ring</option>
          {getItemsByType("ring").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name} (Armor: {slot.armor}, Resistance: {slot.resistance} %)
            </option>
          ))}
        </select>
      </label>
      <div>
        <h3>Selected Equipment</h3>
        <p>Helmet: {item.helmet || "None"}</p>
        <p>Armor: {item.armor || "None"}</p>
        <p>Legs: {item.leg || "None"}</p>
        <p>Boots: {item.boot || "None"}</p>
        <p>Amulet: {item.amulet || "None"}</p>
        <p>Ring: {item.ring || "None"}</p>
      </div>
    </div>
  );
}

export default Equipment;
