import Creature from "./components/creature/creature";
import Equipment from "./components/item/equipment/equipment";
import "./index.css";

function App() {
  return (
    <>
      <div className="page">
        <img
          className="background"
          src="../public/background.png"
          alt="Tibia Background"
        />
        <div className="equipment">
          Equipment
          <Equipment />
        </div>
        <div className="creature">
          Creature
          <Creature />
        </div>
      </div>
    </>
  );
}

export default App;
