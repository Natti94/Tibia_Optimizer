export async function fetchCreature(name) {
  const res = await fetch(`https://api.tibiadata.com/v4/creature/${name.toLowerCase()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch creatures");
  }
  return res.json();
}