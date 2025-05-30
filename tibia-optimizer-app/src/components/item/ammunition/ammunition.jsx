import { useState, useEffect } from "react";
import { ammunitionList } from "../../../data/item/ammunition/ammunition";

function Ammunition() {
  const [ammunition, setAmmunition] = useState({
    ammunition: "",
  });
  const [totalAttack, setTotalAttack] = useState(0);
  const [option, setOption] = useState(null);

  useEffect(() => {
    setOption(ammunitionList);
  }, []);

  const handleChange = (field) => (event) => {
    setAmmunition((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const getAmmunitionByType = (type) => {
    return option ? option.filter((weapon) => weapon.type === type) : [];
  };

  const calculateTotals = () => {
    let attackSum = 0;
    Object.values(ammunition).forEach((ammunitionName) => {
      const selected = ammunitionList.find(
        (theAmmunition) => theAmmunition.name === ammunitionName
      );
      if (!selected) return;
      attackSum += selected.attack || 0;
    });
    setTotalAttack(attackSum);
  };

  return (
    <div>
      <label>
        <select
          value={ammunition.ammunition && ammunition.ammunition}
          onChange={handleChange("ammunition")}
        >
          <option value="">Select an ammunition</option>
          {getAmmunitionByType("ammunition").map((slot) => (
            <option key={slot.name} value={slot.name}>
              {slot.name}
              {slot.attack ? ` - (attack: ${slot.attack})` : ""}
            </option>
          ))}
        </select>
      </label>
      <div>
        <h3>Selected Ammunition:</h3>
        <button className="calculate-button" onClick={calculateTotals}>
          =
        </button>
        <p>
          <strong>Ammunition:</strong> {ammunition.ammunition || "None"}
        </p>
        <p>
          <strong>Total Attack:</strong> {totalAttack}
        </p>
      </div>
    </div>
  );
}

export default Ammunition;
