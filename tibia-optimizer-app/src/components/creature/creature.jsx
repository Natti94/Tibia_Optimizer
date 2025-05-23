import { useEffect, useState } from "react";
import { fetchCreature } from "../../services/creature";
function Creature() {
  const [creature, setCreature] = useState({ name: "" });
  const [option, setOption] = useState([]);

  useEffect(() => {
    if (!creature) return;
    fetch(fetchCreature)
      .then((res) => res.json())
      .then((data) => {
        setOption(data);
      })
      .catch((error) => {
        console.error("not a creature", error);
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
      <ul>
        {option.map((creature) => (
          <li key={creature.id}>{creature.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Creature;
