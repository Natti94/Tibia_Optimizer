export async function fetchItemList() {
  const API_LIST = "https://tibiawiki.dev/api/items";

  try {
    const response = await fetch(API_LIST);
    if (!response.ok) {
      throw new Error(`Failed to fetch item list (Status: ${response.status})`);
    }

    const itemNames = await response.json();

    return itemNames.map((name) => ({
      name,
      type: "ammunition",
      attack: Math.floor(Math.random() * 50),
    }));
  } catch (error) {
    console.error("Item List Load Error:", error.message || error);
    return [];
  }
}
