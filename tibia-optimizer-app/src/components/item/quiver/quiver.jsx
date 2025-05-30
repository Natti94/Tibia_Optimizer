import { useState, useEffect } from "react";
import { quiverList } from "../../../data/item/quiver/quiver";

function Quiver() {
  const [quiver, setQuiver] = useState({
    quiver: "",
  });
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});
  const [option, setOption] = useState(null);

  useEffect(() => {
    setOption(quiverList);
  }, []);
  const handleChange = (field) => (event) => {
    setQuiver((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const getQuiver = (type) => {
    return option ? option.filter((quiver) => quiver.type === type) : [];
  };

  const calculateTotals = () => {
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};

    Object.values(quiver).forEach((quiverName) => {
      const selected = quiverList.find(
        (theQuiver) => theQuiver.name === quiverName
      );
      if (selected && selected.resistanceAll) {
        resistanceOverallSum += selected.resistanceAll;
      }
      if (selected && selected.resistance) {
        Object.entries(selected.resistance).forEach(([element, value]) => {
          resistanceSpecificSum[element] =
            (resistanceSpecificSum[element] || 0) + value;
        });
      }
    });
    setTotalAllResistance(resistanceOverallSum);
    setTotalSpecificResistance(resistanceSpecificSum);
  };

  return (
    <div>
      <label>
        <select value={quiver.quiver} onChange={handleChange("quiver")}>
          <option value="">Select a quiver</option>
          {getQuiver("quiver").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.resistanceAll ? ` - | all res: ${slot.resistanceAll}%` : ""}
              {slot.resistance
                ? Object.entries(slot.resistance)
                    .map(([element, value]) => ` ${element}: ${value}%`)
                    .join(", ")
                : ""}
            </option>
          ))}
        </select>
      </label>
      <h3>Selected Quiver:</h3>
      <button className="calculate-button" onClick={calculateTotals}>
        =
      </button>
      <p>
        <strong>Total All Resistance: </strong>
        {totalAllResistance}%
      </p>
      <p>
        <strong>Element Specific Resistance: </strong>
      </p>
      <ul>
        {Object.entries(totalSpecificResistance).map(([element, value]) => (
          <li key={element}>
            {element}: {value}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiver;
