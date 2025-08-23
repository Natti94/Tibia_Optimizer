import { useState } from "react";
import { runeList } from "../../data/item/rune/rune";

function Rune({ character }) {
  const [selectedRune, setSelectedRune] = useState(null);

  const magicLevel = parseInt(character.magic) || 0;
  // Example magic formula (MAG_F): (magicLevel * 2) + 5
  const MAGIC_FORMULA = magicLevel * 2 + 5;

  let minDamage = "";
  let maxDamage = "";

  if (selectedRune) {
    if (selectedRune.name === "Ultimate Explosion Rune") {
      minDamage = Math.floor(
        selectedRune.minFactor * MAGIC_FORMULA - (selectedRune.minSubtract || 0)
      );
      maxDamage = Math.floor(
        selectedRune.maxFactor * MAGIC_FORMULA - (selectedRune.maxSubtract || 0)
      );
    } else {
      minDamage = Math.floor(selectedRune.minFactor * MAGIC_FORMULA);
      maxDamage = Math.floor(selectedRune.maxFactor * MAGIC_FORMULA);
    }
  }

  return (
    <div>
      <h1>Rune Calculator</h1>
      <label>
        Select Rune:
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
          <p>Effect: {selectedRune.effect}</p>
          <p>Mana Cost: {selectedRune.manaCost}</p>
          <p>
            Damage: {minDamage} - {maxDamage}
          </p>
        </div>
      )}
    </div>
  );
}

export default Rune;
