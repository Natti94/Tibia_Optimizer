import { useState, useEffect } from "react";
import { fetchItemList } from "../../../services/item/item";

function Weapon() {
  const [apiWeapons, setApiWeapons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vocation, setVocation] = useState("");
  const [version, setVersion] = useState("11.40+");
  const [weapon, setWeapon] = useState("");
  const [ammunition, setAmmunition] = useState("");

  // Hardcoded fallback weapons/ammo
  const weapons = ["Sword", "Axe", "Bow", "Crossbow", "Wand", "Rod"];
  const ammunitions = ["Arrow", "Bolt"];

  // Fetch weapons from API on mount
  useEffect(() => {
    setLoading(true);
    fetchItemList()
      .then((data) => {
        // If API returns { items: [...] }
        const items = Array.isArray(data) ? data : data.items || [];
        // Only include items with a name
        setApiWeapons(
          items.filter((item) => item.name && item.name.trim() !== "")
        );
      })
      .catch((err) => setError(err.message || "Failed to load items"))
      .finally(() => setLoading(false));
  }, []);

  // Combine hardcoded and API weapons, remove duplicates
  const allWeapons = [
    ...weapons,
    ...apiWeapons
      .map((item) => item.name)
      .filter((name) => !weapons.includes(name)),
  ];

  return (
    <div>
      <h1>Weapon</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <label>
        Vocation:
        <select value={vocation} onChange={(e) => setVocation(e.target.value)}>
          <option value="">Select vocation</option>
          <option value="knight">Knight</option>
          <option value="paladin">Paladin</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="druid">Druid</option>
        </select>
      </label>
      <label>
        Version:
        <select value={version} onChange={(e) => setVersion(e.target.value)}>
          <option value="11.40+">11.40+</option>
          <option value="before 11.40">Before 11.40</option>
        </select>
      </label>

      {/* Dynamic fields */}
      {vocation === "paladin" && version === "11.40+" && (
        <>
          <label>
            Two-handed Weapon:
            <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
              <option value="">Select weapon</option>
              {allWeapons
                .filter((w) => w === "Bow" || w === "Crossbow")
                .map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Ammunition:
            <select
              value={ammunition}
              onChange={(e) => setAmmunition(e.target.value)}
            >
              <option value="">Select ammunition</option>
              {ammunitions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {vocation === "paladin" && version === "before 11.40" && (
        <>
          <label>
            Weapon:
            <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
              <option value="">Select weapon</option>
              {allWeapons
                .filter((w) => w === "Bow" || w === "Crossbow")
                .map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Ammunition:
            <select
              value={ammunition}
              onChange={(e) => setAmmunition(e.target.value)}
            >
              <option value="">Select ammunition</option>
              {ammunitions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {(vocation === "knight" ||
        vocation === "sorcerer" ||
        vocation === "druid") && (
        <>
          <label>
            Weapon:
            <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
              <option value="">Select weapon</option>
              {allWeapons.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
}

export default Weapon;
