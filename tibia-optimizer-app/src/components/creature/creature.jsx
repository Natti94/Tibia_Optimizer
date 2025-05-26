import { useEffect, useState } from "react";
import { creatureList } from "../creature/data/creature";

function Creature() {
  const [creatureName, setCreatureName] = useState("");
  const [creatureData, setCreatureData] = useState(null);

  useEffect(() => {
    if (creatureName) {
      const foundCreature = creatureList.find(
        (c) => c.name.toLowerCase() === creatureName.toLowerCase()
      );
      setCreatureData(foundCreature);
    } else {
      setCreatureData(null);
    }
  }, [creatureName]);

  return (
    <div className="creature-container">
      <h2>Creature Information</h2>
      <input
        type="text"
        placeholder="Enter creature name"
        value={creatureName}
        onChange={(e) => setCreatureName(e.target.value)}
      />
      {creatureData ? (
        <div className="creature-details">
          <h3>{creatureData.name}</h3>
          <p>Health: {creatureData.health}</p>
          <p>Experience: {creatureData.experience}</p>
          <p>Speed: {creatureData.speed}</p>
          <p>Armor: {creatureData.armor}</p>
          <p>Mitigation: {creatureData.mitigation}</p>
          <p>Max Damage: {creatureData.maxDamage}</p>
          <h4>Damage Types:</h4>
          <ul>
            {Object.entries(creatureData.damageTypes).map(([type, damage]) => (
              <li key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}: {damage}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        creatureName && <p>No data found for "{creatureName}"</p>
      )}
    </div>
  );
}

export default Creature;
