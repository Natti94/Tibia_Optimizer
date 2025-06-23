export async function fetchItemList() {
  const API_ITEM = "/items";
  try {
    const response = await fetch(API_ITEM);
    if (!response.ok) {
      throw new Error(`Failed to fetch item list (Status: ${response.status})`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Item List Load Error:", error.message || error);
    return [];
  }
}
