import { weaponList } from "../../../data/character/items/weapons";

function Weapons({ vocation, weapon, setWeapon }) {
  const forceCasing = (str) =>
    str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  const placeholderWeapons = {
    sword: ["Sword"],
    axe: ["Axe"],
    club: ["Club"],
    bow: ["Bow"],
    crossbow: ["Crossbow"],
    wand: ["Wand"],
    rod: ["Rod"],
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

  const selectedWeaponObj = weaponList.find(
    (item) => item.name === weapon.weapon
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
        {obj.typeDamage && <li>Type: {forceCasing(obj.typeDamage)}</li>}
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

  return (
    <div>
      <h2>Weapons</h2>
      {!vocation && (
        <div className="select-vocation-message">
          <strong>
            🛈 Please select a vocation to view and edit this.
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
              <label>
                Weapon:
                <br />
                <select
                  value={weapon.weapon}
                  onChange={(e) =>
                    setWeapon({ ...weapon, weapon: e.target.value })
                  }
                >
                  <option value="">Select Weapon</option>
                  {["sword", "axe", "club"].flatMap((type) =>
                    getAllOptions(type)
                      .filter((name) =>
                        weaponList.some((item) => item.name === name)
                      )
                      .map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))
                  )}
                </select>
              </label>
            )}
            {vocation === "paladin" && (
              <>
                <label>
                  Weapon:
                  <br />
                  <select
                    value={weapon.weapon}
                    onChange={(e) =>
                      setWeapon({ ...weapon, weapon: e.target.value })
                    }
                  >
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
                      value={weapon.ammunition}
                      onChange={(e) =>
                        setWeapon({ ...weapon, ammunition: e.target.value })
                      }
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
                      value={weapon.ammunition}
                      onChange={(e) =>
                        setWeapon({ ...weapon, ammunition: e.target.value })
                      }
                    >
                      <option value="">Select Bolt</option>
                      <option value="Bolt">Bolt</option>
                    </select>
                  </label>
                )}
              </>
            )}
            {vocation === "sorcerer" && (
              <label>
                Weapon:
                <br />
                <select
                  value={weapon.weapon}
                  onChange={(e) =>
                    setWeapon({ ...weapon, weapon: e.target.value })
                  }
                >
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
            )}
            {vocation === "druid" && (
              <label>
                Weapon:
                <br />
                <select
                  value={weapon.weapon}
                  onChange={(e) =>
                    setWeapon({ ...weapon, weapon: e.target.value })
                  }
                >
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
            )}
            {renderWeaponProps()}
          </>
        )}
      </div>
    </div>
  );
}

export default Weapons;
