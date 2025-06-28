export async function fetchItemList() {
  const API_ITEM = "/api/items";
  try {
    const response = await fetch(API_ITEM);
    if (!response.ok) {
      throw new Error(`Failed to fetch item list (Status: ${response.status})`);
    }

    const data = await response.json(); // Assuming the API returns JSON data
    return data;
  } catch (error) {
    console.error("Item List Load Error:", error.message || error);
    return [];
  }
}
