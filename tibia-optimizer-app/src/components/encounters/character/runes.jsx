import { useState } from "react";
import { runeList } from "../../../data/character/items/rune";

const VOCATION_MODIFIERS = {
  knight: { magic: 0.3 },
  paladin: { magic: 0.5 },
  sorcerer: { magic: 1.0 },
  druid: { magic: 1.0 },
  "": { magic: 0.1 },
};

function Rune({ character }) {
  const [selectedRune, setSelectedRune] = useState(null);
  const magicLevel = parseInt(character.magic) || 0;
  const MAGIC_FORMULA = magicLevel * 2 + 5;
  const vocation = character.vocation || "";
  const magicMod =
    (VOCATION_MODIFIERS[vocation] && VOCATION_MODIFIERS[vocation].magic) || 1;

  let minDamage = "";
  let maxDamage = "";

  const forceCasing = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  if (selectedRune) {
    if (
      selectedRune.minSubtract !== undefined ||
      selectedRune.maxSubtract !== undefined
    ) {
      minDamage = Math.floor(
        ((selectedRune.minFactor || 0) * MAGIC_FORMULA -
          (selectedRune.minSubtract || 0)) *
          magicMod
      );
      maxDamage = Math.floor(
        ((selectedRune.maxFactor || 0) * MAGIC_FORMULA -
          (selectedRune.maxSubtract || 0)) *
          magicMod
      );
    } else {
      minDamage = Math.floor(
        (selectedRune.minFactor || 0) * MAGIC_FORMULA * magicMod
      );
      maxDamage = Math.floor(
        (selectedRune.maxFactor || 0) * MAGIC_FORMULA * magicMod
      );
    }
  }

  return (
    <>
      <h2>Runes</h2>
      {!character.vocation && (
        <div className="select-vocation-message">
          <strong>🛈 Please select a vocation to view and edit this.</strong>
        </div>
      )}
      <div className={`vocation-content${character.vocation ? " show" : ""}`}>
        {character.vocation && (
          <>
            <div>
              <h3>Vocational Rune Modifiers</h3>
              <ul>
                <li>Knight: 30%</li>
                <li>Paladin: 50%</li>
                <li>Sorcerer: 100%</li>
                <li>Druid: 100%</li>
                <li>No vocation: 50%</li>
              </ul>
              <p>
                Your vocation is{" "}
                <strong>{forceCasing(character.vocation)}.</strong>
              </p>
            </div>
            <label>
              Select Rune:
              <br />
              <select
                value={selectedRune ? selectedRune.name : ""}
                onChange={(e) => {
                  const rune = runeList.find((r) => r.name === e.target.value);
                  setSelectedRune(rune || null);
                }}
              >
                <option value="">Select rune</option>
                {runeList.map((rune) => (
                  <option key={rune.name} value={rune.name}>
                    {rune.name}
                  </option>
                ))}
              </select>
            </label>
            {selectedRune && (
              <div>
                <p>Type: {forceCasing(selectedRune.typeDamage)}</p>
                <p>
                  Damage: {minDamage} - {maxDamage}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Rune;
