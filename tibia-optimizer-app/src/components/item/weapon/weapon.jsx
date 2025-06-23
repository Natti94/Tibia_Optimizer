import { useState, useEffect } from "react";
import { fetchItemList } from "../../../services/item/item";

function Weapon() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState("");

  useEffect(() => {
    async function loadItems() {
      try {
        const itemList = await fetchItemList();
        setItems(itemList);
      } catch (err) {
        setError(err.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Weapon List</h1>
      <label htmlFor="weapon-select">Choose a weapon:</label>
      <select
        id="weapon-select"
        value={selectedWeapon}
        onChange={(e) => setSelectedWeapon(e.target.value)}
      >
        <option value="">-- Select a weapon --</option>
        {items
          .filter(
            (item) => item.attack !== undefined || item.damage !== undefined
          )
          .map((item, idx) => (
            <option key={item.id || item.name || idx} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
      {selectedWeapon && (
        <div style={{ marginTop: "1em" }}>
          <strong>Selected Weapon:</strong> {selectedWeapon}
        </div>
      )}
    </div>
  );
}

export default Weapon;
