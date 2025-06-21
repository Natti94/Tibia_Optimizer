export function Calculation(item) {
  const attack = parseInt(item.atk_mod || 0, 10);
  const hitMod = parseInt(item.hit_mod || 0, 10);
  const resistances = {};

  if (item.resist) {
    const matches = item.resist.matchAll(/(\w+)\s*\+(\d+)%/g);
    for (const [, type, value] of matches) {
      resistances[type.toLowerCase()] =
        (resistances[type.toLowerCase()] || 0) + parseInt(value);
    }
  }

  const critChance = parseInt(item.crithit_ch || "0", 10);
  const critDamage = parseInt(item.critextra_dmg || "0", 10);

  return {
    name: item.name,
    type: item.weapontype,
    subtype: item.secondarytype,
    attack,
    hitMod,
    resistances,
    critChance,
    critDamage,
    level: parseInt(item.levelrequired || 0, 10),
    vocation: item.vocrequired || "All",
    imbuementSlots: parseInt(item.imbueslots || 0, 10),
  };
}
