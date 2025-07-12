import { useState, useEffect } from "react";
import { weaponList } from "../../../data/item/weapon/weapon";

// Placeholder for weapon types (optional, can be empty or used for UI fallback)
const placeholderWeapons = {
  sword: ["Sword"],
  axe: ["Axe"],
  club: ["Club"],
  bow: ["Bow"],
  crossbow: ["Crossbow"],
  wand: ["Wand"],
  rod: ["Rod"],
  // Add more if needed
};

function Weapon() {
  const [apiWeapons, setApiWeapons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weapon, setWeapon] = useState("");
  const [ammunition, setAmmunition] = useState("");
  const [vocation, setVocation] = useState("");

  // Fetch all weapons from dataset on mount (no version filter)
  useEffect(() => {
    setLoading(true);
    try {
      const items = weaponList.filter(
        (item) => item.name && item.name.trim() !== ""
      );
      setApiWeapons(items);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load weapons");
      setLoading(false);
    }
  }, []);

  // Get all weapon options by type (for select dropdowns)
  const getAllOptions = (type) => {
    const placeholders = placeholderWeapons[type] || [];
    const apiNames = apiWeapons
      .filter(
        (item) => item.type && item.type.toLowerCase() === type && item.name
      )
      .map((item) => item.name);
    return [
      ...placeholders,
      ...apiNames.filter((name) => !placeholders.includes(name)),
    ];
  };

  // Find selected weapon object (from API only)
  const selectedWeaponObj = apiWeapons.find((item) => item.name === weapon);

  // Determine if selected weapon is a Bow or Crossbow (EXACT match)
  const isCrossbow =
    selectedWeaponObj &&
    selectedWeaponObj.name &&
    selectedWeaponObj.name.toLowerCase().includes("crossbow");
  const isBow =
    selectedWeaponObj &&
    selectedWeaponObj.name &&
    selectedWeaponObj.name.toLowerCase().includes("bow") &&
    !isCrossbow;

  // Totals for output
  const [totalAttack, setTotalAttack] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);

  // Calculate totals (API items only)
  const calculateTotals = () => {
    if (!selectedWeaponObj) {
      setTotalAttack(0);
      setTotalDamage(0);
      return;
    }
    if (vocation === "knight" || vocation === "paladin") {
      setTotalAttack(selectedWeaponObj.attack || 0);
      setTotalDamage(0);
    } else if (vocation === "sorcerer" || vocation === "druid") {
      // If damage is an object (min/max), sum or average as needed
      if (
        selectedWeaponObj.damage &&
        typeof selectedWeaponObj.damage === "object"
      ) {
        const { min = 0, max = 0 } = selectedWeaponObj.damage;
        setTotalAttack(0);
        setTotalDamage((min + max) / 2);
      } else {
        setTotalAttack(0);
        setTotalDamage(selectedWeaponObj.damage || 0);
      }
    } else {
      setTotalAttack(0);
      setTotalDamage(0);
    }
  };

  // Display properties for selected weapon (API only)
  const renderWeaponProps = () => {
    const obj = selectedWeaponObj;
    if (!obj) return null;
    return (
      <ul>
        {obj.attack !== undefined && obj.attack !== null && (
          <li>Attack: {obj.attack}</li>
        )}
        {obj.damage !== undefined && obj.damage !== null && (
          <li>
            Damage:{" "}
            {typeof obj.damage === "object"
              ? `${obj.damage.min} - ${obj.damage.max}`
              : obj.damage}
          </li>
        )}
        {obj.typeDamage && <li>Type: {obj.typeDamage}</li>}
        {obj.resistanceAll !== undefined && obj.resistanceAll !== 0 && (
          <li>All Resistance: {obj.resistanceAll}%</li>
        )}
        {obj.resistance &&
          Object.entries(obj.resistance).map(([element, value]) => (
            <li key={element}>
              {element}: {value}%
            </li>
          ))}
        {obj.skills &&
          Object.entries(obj.skills).map(([skill, value]) => (
            <li key={skill}>
              {skill}: {value}
            </li>
          ))}
      </ul>
    );
  };

  // Handle select change
  const handleChange = (event) => {
    setWeapon(event.target.value);
  };

  return (
    <div>
      <h1>Weapon</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <label>
        Vocation:
        <br />
        {/* Vocation selection */}
        <select value={vocation} onChange={(e) => setVocation(e.target.value)}>
          <option value="">Select vocation</option>
          <option value="knight">Knight</option>
          <option value="paladin">Paladin</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="druid">Druid</option>
        </select>
      </label>

      {/* Weapon selection by vocation */}
      {vocation === "knight" && (
        <>
          <label>
            Weapon:
            <br />
            {/* Knight can use sword, axe, club */}
            <select value={weapon} onChange={handleChange}>
              <option value="">Select Weapon</option>
              {["sword", "axe", "club"].flatMap((type) =>
                getAllOptions(type).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>
        </>
      )}

      {vocation === "paladin" && (
        <>
          <label>
            Weapon:
            <br />
            {/* Paladin can use Bow & Crossbow */}
            <select value={weapon} onChange={handleChange}>
              <option value="">Select Weapon</option>
              {["bow", "crossbow"].flatMap((type) =>
                getAllOptions(type).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>
          {/* Only show Arrow if Bow, Bolt if Crossbow */}
          {isBow && (
            <label>
              Arrow:
              <br />
              <select
                value={ammunition}
                onChange={(e) => setAmmunition(e.target.value)}
              >
                <option value="">Select arrow</option>
                <option value="Arrow">Arrow</option>
              </select>
            </label>
          )}
          {isCrossbow && (
            <label>
              Bolt:
              <br />
              <select
                value={ammunition}
                onChange={(e) => setAmmunition(e.target.value)}
              >
                <option value="">Select Bolt</option>
                <option value="Bolt">Bolt</option>
              </select>
            </label>
          )}
        </>
      )}

      {vocation === "sorcerer" && (
        <>
          <label>
            Weapon:
            <select value={weapon} onChange={handleChange}>
              <option value="">Select Weapon</option>
              {["wand"].flatMap((type) =>
                getAllOptions(type).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>
        </>
      )}

      {vocation === "druid" && (
        <>
          <label>
            Weapon:
            <select value={weapon} onChange={handleChange}>
              <option value="">Select weapon</option>
              {["rod"].flatMap((type) =>
                getAllOptions(type).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>
        </>
      )}

      {renderWeaponProps()}

      <h3>Calculate:</h3>
      <button className="calculate-button" onClick={calculateTotals}>
        =
      </button>
      <p>
        <strong>
          {vocation === "knight" || vocation === "paladin"
            ? "Total Attack: "
            : "Total Damage: "}
        </strong>
        {vocation === "knight" || vocation === "paladin"
          ? totalAttack
          : totalDamage}
      </p>
    </div>
  );
}

export default Weapon;
