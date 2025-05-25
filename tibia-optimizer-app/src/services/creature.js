export async function fetchCreature(name) {
  const URL = `https://api.tibiadata.com/v4/creature/${name.toLowerCase()}`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Failed to fetch creatures");
  }
  const data = await response.json();
  return data.creature;
}
