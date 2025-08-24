import { useState } from "react";
import { weaponList } from "../../../data/character/items/weapons";

function Weapon({ vocation }) {
  const [weapon, setWeapon] = useState("");
  const [ammunition, setAmmunition] = useState("");

  const placeholderWeapons = {
    sword: ["Sword"],
    axe: ["Axe"],
    club: ["Club"],
    bow: ["Bow"],
    crossbow: ["Crossbow"],
    wand: ["Wand"],
    rod: ["Rod"],
  };

  const forceCasing = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  const getAllOptions = (type) => {
    const placeholders = placeholderWeapons[type] || [];
    const data = Array.isArray(weaponList) ? weaponList : [];
    const apiNames = data
      .filter(
        (item) => item.type && item.type.toLowerCase() === type && item.name
      )
      .map((item) => item.name);
    return [
      ...placeholders,
      ...apiNames.filter((name) => !placeholders.includes(name)),
    ];
  };

  const selectedWeaponObj = (Array.isArray(weaponList) ? weaponList : []).find(
    (item) => item.name === weapon
  );

  const isCrossbow =
    selectedWeaponObj &&
    selectedWeaponObj.name &&
    selectedWeaponObj.name.toLowerCase().includes("crossbow");
  const isBow =
    selectedWeaponObj &&
    selectedWeaponObj.name &&
    selectedWeaponObj.name.toLowerCase().includes("bow") &&
    !isCrossbow;

  // --- Calculate attack/damage directly ---
  let totalAttack = 0;
  let totalDamage = 0;
  if (selectedWeaponObj) {
    if (vocation === "knight" || vocation === "paladin") {
      totalAttack = selectedWeaponObj.attack || 0;
      totalDamage = 0;
    } else if (vocation === "sorcerer" || vocation === "druid") {
      if (
        selectedWeaponObj.damage &&
        typeof selectedWeaponObj.damage === "object"
      ) {
        const { min = 0, max = 0 } = selectedWeaponObj.damage;
        totalAttack = 0;
        totalDamage = (min + max) / 2;
      } else {
        totalAttack = 0;
        totalDamage = selectedWeaponObj.damage || 0;
      }
    }
  }

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
              {forceCasing(element)}: {value}%
            </li>
          ))}
        {obj.skills &&
          Object.entries(obj.skills).map(([skill, value]) => (
            <li key={skill}>
              {forceCasing(skill)}: {value}
            </li>
          ))}
      </ul>
    );
  };

  const handleChange = (event) => {
    setWeapon(event.target.value);
  };

  return (
    <div>
      <h2>Weapons</h2>
      {!vocation && (
        <div className="select-vocation-message">
          <strong>
            🛈 Please select a vocation to view and manage weapons.
          </strong>
        </div>
      )}
      <div className={`vocation-content${vocation ? " show" : ""}`}>
        {vocation && (
          <>
            <label>
              <h4>🛈 Your vocation has already been selected.</h4>
              <h5>
                This now displays the weapon options available for your
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
            <br />
            <br />
            {vocation === "knight" && (
              <>
                <label>
                  Weapon:
                  <br />
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
                  <br />
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
                  <br />
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
          </>
        )}
      </div>
    </div>
  );
}

export default Weapon;
