import { useState } from "react";

function Character() {
  const [character, setCharacter] = useState({
    vocation: "",
    level: "",
    magic: "",
    skill: {
      sword: "",
      axe: "",
      club: "",
      distance: "",
      shield: "",
    },
  });

  const VOCATION_MODIFIERS = {
    knight: { health: 15, mana: 5, melee: 1.0, distance: 0.55, magic: 0.3 },
    paladin: { health: 10, mana: 15, melee: 0.7, distance: 1.0, magic: 0.5 },
    sorcerer: { health: 5, mana: 30, melee: 0.3, distance: 0.4, magic: 1.0 },
    druid: { health: 5, mana: 30, melee: 0.3, distance: 0.4, magic: 1.0 },
    "": { health: 0, mana: 0, melee: 0.5, distance: 0.5, magic: 0.5 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      skill: {
        ...prev.skill,
        [name]: value,
      },
    }));
  };

  const getVocationModifier = (vocation, type) => {
    const mods = VOCATION_MODIFIERS[vocation] || VOCATION_MODIFIERS[""];
    return mods[type] || 1;
  };

  const levelNum = parseInt(character.level) || 0;
  const vocationMods =
    VOCATION_MODIFIERS[character.vocation] || VOCATION_MODIFIERS[""];
  const calculatedHealth = levelNum * vocationMods.health;
  const calculatedMana = levelNum * vocationMods.mana;

  const meleeEffective = 100 * getVocationModifier(character.vocation, "melee");
  const distanceEffective =
    100 * getVocationModifier(character.vocation, "distance");
  const magicEffective = 100 * getVocationModifier(character.vocation, "magic");

  return (
    <div>
      <form>
        <h1>Character</h1>
        <h3>Main Attributes</h3>
        <label>
          Vocation:
          <br />
          <select
            name="vocation"
            value={character.vocation}
            onChange={handleChange}
          >
            <option value="">Select vocation</option>
            <option value="knight">Knight</option>
            <option value="paladin">Paladin</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="druid">Druid</option>
          </select>
        </label>
        <label>
          Level:
          <br />
          <input
            type="number"
            name="level"
            value={character.level}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Magic Level:
          <br />
          <input
            type="number"
            name="magic"
            value={character.magic}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Health:
          <br />
          <input type="number" value={calculatedHealth} readOnly />
        </label>
        <label>
          Mana:
          <br />
          <input type="number" value={calculatedMana} readOnly />
        </label>
        <label>
          <h3>Secondary Attributes</h3>
          {Object.keys(character.skill).map((skill) => (
            <label key={skill}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}:
              <br />
              <input
                type="number"
                name={skill}
                value={character.skill[skill]}
                onChange={handleSkillChange}
                min="0"
              />
            </label>
          ))}
        </label>
        <div>
          <h3>Vocational Damage Modifiers</h3>
          <ul>
            <li>
              Melee: {getVocationModifier(character.vocation, "melee") * 100}%
            </li>
            <li>
              Distance:{" "}
              {getVocationModifier(character.vocation, "distance") * 100}%
            </li>
            <li>
              Magic: {getVocationModifier(character.vocation, "magic") * 100}%
            </li>
          </ul>
        </div>
      </form>
      <div>
        <h4>Main Attributes</h4>
        <ul>
          <li>Vocation: {character.vocation}</li>
          <li>Level: {character.level}</li>
          <li>Health: {calculatedHealth}</li>
          <li>Mana: {calculatedMana}</li>
          <li>Magic: {character.magic}</li>
        </ul>
      </div>
      <div>
        <h4>Secondary Attributes</h4>
        <ul>
          {Object.entries(character.skill).map(([skill, value]) => (
            <li key={skill}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Effective Damage</h4>
        <ul>
          <li>Melee Effective: {meleeEffective}</li>
          <li>Distance Effective: {distanceEffective}</li>
          <li>Magic Effective: {magicEffective}</li>
        </ul>
      </div>
    </div>
  );
}

export default Character;
