import { useState, useEffect } from "react";
import { equipmentList } from "../../data/character/items/equipments";
import { weaponList } from "../../data/character/items/weapons";
import Skills from "./character/skills";
import Equipments from "./character/items/equipments";
import Weapons from "./character/items/weapons";
import Runes from "./encounters/character/runes";
import Spells from "./encounters/character/spells";

function Form() {
  const [main, setMain] = useState({
    vocation: "",
    level: "",
    magic: "",
  });
  const [secondary, setSecondary] = useState({
    sword: "",
    axe: "",
    club: "",
    distance: "",
    shield: "",
  });
  const [equipment, setEquipment] = useState({
    helmet: "",
    armor: "",
    leg: "",
    boot: "",
    amulet: "",
    ring: "",
    trinket: "",
    offhand: "",
  });
  const [weapon, setWeapon] = useState({
    weapon: "",
    ammunition: "",
  });

  const [showSkills, setShowSkills] = useState(true);
  const [showEquipments, setShowEquipments] = useState(true);
  const [showWeapons, setShowWeapons] = useState(true);

  const [intro, setIntro] = useState(true);
  const [showMainCard, setShowMainCard] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [hiding, setHiding] = useState(false);

  const background = import.meta.env.VITE_CLOUDINARY_BACKGROUND;
  const title = import.meta.env.VITE_CLOUDINARY_TITLE;
  const smokeEffect = import.meta.env.VITE_CLOUDINARY_SMOKE_EFFECT;

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function forceCasing(str) {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  }

  let totalArmor = 0;
  let totalAllResistance = 0;
  let totalSpecificResistance = {};
  let skillSum = { ...secondary };
  let magicLevelBonus = 0;

  const effectiveMagicLevel = (parseInt(main.magic) || 0) + magicLevelBonus;

  const addTo = (obj, key, value) => {
    obj[key] = (parseInt(obj[key]) || 0) + (parseInt(value) || 0);
  };

  const selectedEquipments = Object.values(equipment)
    .map((name) => equipmentList.find((item) => item.name === name))
    .filter(Boolean);

  selectedEquipments.forEach((item) => {
    totalArmor += item.armor || 0;
    if (item.resistanceAll) totalAllResistance += item.resistanceAll;
    if (item.resistance) {
      Object.entries(item.resistance).forEach(([element, value]) => {
        addTo(totalSpecificResistance, element, value);
      });
    }
    if (item.skills) {
      Object.entries(item.skills).forEach(([skill, value]) => {
        addTo(skillSum, skill, value);
        if (skill === "magicLevel") magicLevelBonus += value;
      });
    }
  });

  const selectedWeaponObj = weaponList.find(
    (item) => item.name === weapon.weapon
  );

  let totalAttack = 0;
  let totalDamage = 0;
  if (selectedWeaponObj) {
    totalAttack = selectedWeaponObj.attack || 0;
    if (
      typeof selectedWeaponObj.damage === "object" &&
      selectedWeaponObj.damage !== null
    ) {
      totalDamage =
        ((selectedWeaponObj.damage.min || 0) +
          (selectedWeaponObj.damage.max || 0)) /
        2;
    } else {
      totalDamage = selectedWeaponObj.damage || 0;
    }
  }
  if (selectedWeaponObj) {
    if (selectedWeaponObj.attack)
      addTo(skillSum, "attack", selectedWeaponObj.attack);
    if (selectedWeaponObj.damage)
      addTo(skillSum, "damage", selectedWeaponObj.damage);
    if (selectedWeaponObj.resistance) {
      Object.entries(selectedWeaponObj.resistance).forEach(
        ([element, value]) => {
          addTo(totalSpecificResistance, element, value);
        }
      );
    }
    if (selectedWeaponObj.skills) {
      Object.entries(selectedWeaponObj.skills).forEach(([skill, value]) => {
        addTo(skillSum, skill, value);
        if (skill === "magicLevel") magicLevelBonus += value;
      });
    }
  }

  return (
    <div className="app-container">
      <img className="background" src={background} alt="Background" />
      <div className="content-wrapper">
        <div className="app-title-wrapper">
          <img src={title} alt="Title" className="app-title" />
          <video
            src={smokeEffect}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.1,
              transition: "opacity 0.5s ease-in-out",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>
        {!showMainCard && (
          <button
            className="begin-shine-btn"
            onClick={() => {
              setHiding(true);
              setShowMainCard(true);
              setTimeout(() => {
                setHiding(false);
                document
                  .getElementById("move-to-vocation")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
            }}
            aria-label="Show Main Card"
            type="button"
            style={{ margin: "2rem auto 0 auto", display: "block" }}
          >
            BEGIN
          </button>
        )}
        {(showMainCard || hiding) && (
          <div className={`main-card${hiding ? " hide" : " show"}`}>
            <button
              className="restart-btn"
              onClick={() => {
                setHiding(true);
                setTimeout(() => {
                  setShowMainCard(false);
                  setHiding(false);
                }, 250);
              }}
              aria-label="Restart"
              type="button"
              style={{
                marginBottom: "1.5rem",
                marginLeft: 0,
                display: "block",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <span className="restart-icon" role="img" aria-label="Restart">
                ⟳
              </span>
              <span className="toggle-label">Restart</span>
            </button>
            <hr color="aqua" />
            <h1>Character</h1>
            <div style={{ marginBottom: "1.5rem" }}>
              <label>
                <div id="move-to-vocation" />
                <strong>Vocation:</strong>
                <br />
                <select
                  name="vocation"
                  value={main.vocation}
                  onChange={(e) =>
                    setMain((prev) => ({
                      ...prev,
                      vocation: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Vocation</option>
                  <option value="knight">Knight</option>
                  <option value="paladin">Paladin</option>
                  <option value="sorcerer">Sorcerer</option>
                  <option value="druid">Druid</option>
                </select>
              </label>
            </div>
            {showMainCard && (
              <div className="collapsible-section open">
                <div style={{ marginBottom: "1rem" }}>
                  <button
                    className="collapse-toggle"
                    onClick={() => setShowSkills((v) => !v)}
                    aria-label={
                      showSkills ? "Collapse Skills" : "Expand Skills"
                    }
                    type="button"
                  >
                    <span
                      className={`arrow ${showSkills ? "up" : "down"}`}
                    ></span>
                    <span className="toggle-label">Skills</span>
                  </button>
                </div>
                <div
                  className={`collapsible-section${showSkills ? " open" : ""}`}
                >
                  {showSkills && (
                    <div className="panel">
                      <Skills
                        main={main}
                        setMain={setMain}
                        secondary={secondary}
                        setSecondary={setSecondary}
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <button
                    className="collapse-toggle"
                    onClick={() => setShowEquipments((v) => !v)}
                    aria-label={
                      showEquipments
                        ? "Collapse Equipments"
                        : "Expand Equipments"
                    }
                  >
                    <span
                      className={`arrow ${showEquipments ? "up" : "down"}`}
                    ></span>
                    <span className="toggle-label">Equipments</span>
                  </button>
                </div>
                <div
                  className={`collapsible-section${
                    showEquipments ? " open" : ""
                  }`}
                >
                  {showEquipments && (
                    <div className="panel">
                      <Equipments
                        vocation={main.vocation}
                        equipment={equipment}
                        setEquipment={setEquipment}
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <button
                    className="collapse-toggle"
                    onClick={() => setShowWeapons((v) => !v)}
                    aria-label={
                      showWeapons ? "Collapse Weapons" : "Expand Weapons"
                    }
                  >
                    <span
                      className={`arrow ${showWeapons ? "up" : "down"}`}
                    ></span>
                    <span className="toggle-label">Weapons</span>
                  </button>
                </div>
                <div
                  className={`collapsible-section${showWeapons ? " open" : ""}`}
                >
                  {showWeapons && (
                    <div className="panel">
                      <Weapons
                        vocation={main.vocation}
                        weapon={weapon}
                        setWeapon={setWeapon}
                      />
                    </div>
                  )}
                </div>
                <div className="equipment-summary">
                  <h3>Character Summary</h3>
                  <div className="equipment-grid">
                    <p>
                      <strong>Vocation:</strong>{" "}
                      {forceCasing(main.vocation) || "None"}
                    </p>
                    <p>
                      <strong>Level:</strong> {main.level || "None"}
                    </p>
                    <p>
                      <strong>Magic Level:</strong> {main.magic || "None"}
                    </p>
                    <p>
                      <strong>Effective Magic Level:</strong>{" "}
                      {effectiveMagicLevel}
                    </p>
                    <p>
                      <strong>Weapon:</strong> {weapon.weapon || "None"}
                    </p>
                    <p>
                      <strong>Ammunition:</strong> {weapon.ammunition || "None"}
                    </p>
                    <p>
                      <strong>Helmet:</strong> {equipment.helmet || "None"}
                    </p>
                    <p>
                      <strong>Armor:</strong> {equipment.armor || "None"}
                    </p>
                    <p>
                      <strong>Legs:</strong> {equipment.leg || "None"}
                    </p>
                    <p>
                      <strong>Boots:</strong> {equipment.boot || "None"}
                    </p>
                    <p>
                      <strong>Amulet:</strong> {equipment.amulet || "None"}
                    </p>
                    <p>
                      <strong>Ring:</strong> {equipment.ring || "None"}
                    </p>
                    <p>
                      <strong>Trinket:</strong> {equipment.trinket || "None"}
                    </p>
                    <p>
                      <strong>Shield/Offhand/Spellbook:</strong>{" "}
                      {equipment.offhand || "None"}
                    </p>
                  </div>
                  <br />
                  <ul>
                    <li>
                      <strong>Total Armor:</strong> {totalArmor}
                    </li>
                    <li>
                      <strong>Total All Resistance:</strong>{" "}
                      {totalAllResistance}%
                    </li>
                    <li>
                      <strong>Total Element Specific Resistance:</strong>
                      <ul>
                        {Object.entries(totalSpecificResistance).map(
                          ([element, value]) => (
                            <li key={element}>
                              {forceCasing(element)}: {value}%
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                    <li>
                      <strong>Total Skills:</strong>
                      <ul>
                        {Object.entries(skillSum)
                          .filter(
                            ([skill]) =>
                              skill !== "attack" && skill !== "damage"
                          )
                          .map(([skill, value]) => (
                            <li key={skill}>
                              {forceCasing(skill)}: {value}
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li>
                      <strong>Total Attack:</strong> {totalAttack}
                    </li>
                    <li>
                      <strong>Total Damage:</strong> {totalDamage}
                    </li>
                  </ul>
                </div>
                <br />
                <hr color="aqua" />
                <h1>Encounter</h1>
                <div className="row">
                  <div className="col-main panel">
                    <Runes
                      character={{
                        ...main,
                        magic: effectiveMagicLevel,
                      }}
                    />
                  </div>
                  <div className="col-side panel">
                    <Spells
                      character={{
                        ...main,
                        magic: effectiveMagicLevel,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {intro ? (
          <div className="collapse-overlay">
            <button
              className="begin-optimize-btn"
              onClick={() => {
                setIntro(false);
                setTimeout(() => {
                  window.scrollTo({ top: 80, behavior: "smooth" });
                }, 10);
              }}
            >
              START PLAYING YOUR CHARACTER LIKE A PRO!
            </button>
          </div>
        ) : null}
        {showScroll && (
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;
