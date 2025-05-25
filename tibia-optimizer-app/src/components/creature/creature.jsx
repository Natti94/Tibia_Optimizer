import { useEffect, useState } from "react";
import { fetchCreature } from "../../services/creature";

function Creature() {
  const [creature, setCreature] = useState({ name: "" });
  const [option, setOption] = useState(null);

  useEffect(() => {
    if (!creature) return;
    fetchCreature(creature.name)
      .then((data) => setOption(data))
      .catch((error) => {
        console.error("Fetch failed:", error);
        setOption(null);
      });
  }, [creature, creature.name]);

  return (
    <div>
      <input
        type="text"
        value={creature.name}
        onChange={(event) => setCreature({ name: event.target.value })}
        placeholder="type creature name..."
      />
      {option && (
        <div>
          <h2>{option.name}</h2>
          <p>{option.description}</p>
        </div>
      )}
    </div>
  );
}

export default Creature;
