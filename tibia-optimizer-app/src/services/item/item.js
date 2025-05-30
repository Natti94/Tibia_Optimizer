export async function ItemSelect(selectElementId) {
  const API_LIST = "https://tibiawiki.dev/api/items";

  try {
    const response = await fetch(API_LIST);
    if (!response.ok) {
      throw new Error(`Failed to fetch item list (Status: ${response.status})`);
    }

    const itemList = await response.json();

    const selectElement = document.getElementById(selectElementId);
    if (!selectElement) {
      throw new Error(`No select element found with ID "${selectElementId}"`);
    }

    selectElement.innerHTML = "";
    itemList.forEach((itemName) => {
      const option = document.createElement("option");
      option.value = itemName;
      option.textContent = itemName;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Item List Load Error:", error.message || error);
  }
}
