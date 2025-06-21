export async function fetchItemList() {
  const API_LIST = "/api/items"; // Use relative path for Vite proxy

  try {
    const response = await fetch(API_LIST);
    if (!response.ok) {
      throw new Error(`Failed to fetch item list (Status: ${response.status})`);
    }

    // Assuming the API returns an array of item objects, not just names
    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Item List Load Error:", error.message || error);
    return [];
  }
}
