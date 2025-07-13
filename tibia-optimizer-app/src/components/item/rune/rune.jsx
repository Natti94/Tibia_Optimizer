import { useState } from "react";
import { runeList } from "../../../data/item/rune/rune";

function Rune() {
  const [selectedRune, setSelectedRune] = useState(null);

  const handleRuneSelect = (rune) => {
    setSelectedRune(rune);
  };

  return (
    <div>
      <h1>Runes</h1>
      <ul>
        {runeList.map((rune) => (
          <li key={rune.name} onClick={() => handleRuneSelect(rune)}>
            {rune.name}
          </li>
        ))}
      </ul>
      {selectedRune && (
        <div>
          <h2>{selectedRune.name}</h2>
          <p>Type: {selectedRune.type}</p>
          <p>Vocation: {selectedRune.vocation.join(", ")}</p>
          <p>Mana Cost: {selectedRune.manaCost}</p>
          <p>Effect: {selectedRune.effect}</p>
        </div>
      )}
    </div>
  );
}

export default Rune;
