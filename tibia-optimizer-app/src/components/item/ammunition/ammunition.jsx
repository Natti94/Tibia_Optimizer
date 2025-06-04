import { useState, useEffect } from "react";
import { fetchItemList } from "../services/itemService";

function Ammunition() {
  const [ammunition, setAmmunition] = useState({});
  const [totalAttack, setTotalAttack] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchItemList().then(setOptions);
  }, []);

  const handleChange = (field) => (event) => {
    setAmmunition((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const getAmmunitionByType = (type) => {
    return options.filter((item) => item.type === type);
  };

  const calculateTotals = () => {
    const attackSum = Object.values(ammunition).reduce((sum, name) => {
      const item = options.find((i) => i.name === name);
      return sum + (item?.attack || 0);
    }, 0);
    setTotalAttack(attackSum);
  };

  return (
    <div>
      <label>
        <select
          value={ammunition.ammunition || ""}
          onChange={handleChange("ammunition")}
        >
          <option value="">Select an ammunition</option>
          {getAmmunitionByType("ammunition").map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} {item.attack ? `- (attack: ${item.attack})` : ""}
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
