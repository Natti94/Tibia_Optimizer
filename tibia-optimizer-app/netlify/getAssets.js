const assetPaths = {
  background: process.env.VITE_CLOUDINARY_BACKGROUND,
  title: process.env.VITE_CLOUDINARY_TITLE,
  title_effect: process.env.VITE_CLOUDINARY_TITLE_EFFECT,
  level_icon: process.env.VITE_CLOUDINARY_LEVEL_ICON,
  magicLevel_icon: process.env.VITE_CLOUDINARY_MAGIC_LEVEL_ICON,
  hitPoint_icon: process.env.VITE_CLOUDINARY_HIT_POINT_ICON,
  manaPoint_icon: process.env.VITE_CLOUDINARY_MANA_POINT_ICON,
  swordFighting_icon: process.env.VITE_CLOUDINARY_SWORD_FIGHTING_ICON,
  axeFighting_icon: process.env.VITE_CLOUDINARY_AXE_FIGHTING_ICON,
  clubFighting_icon: process.env.VITE_CLOUDINARY_CLUB_FIGHTING_ICON,
  distanceFighting_icon: process.env.VITE_CLOUDINARY_DISTANCE_FIGHTING_ICON,
  fistFighting_icon: process.env.VITE_CLOUDINARY_FIST_FIGHTING_ICON,
  shielding_icon: process.env.VITE_CLOUDINARY_SHIELDING_ICON,
};

export async function handler(event) {
  const { asset } = event.queryStringParameters;

  if (!asset) {
    console.error("No asset parameter provided");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Asset parameter is required" }),
    };
  }

  const url = assetPaths[asset];
  if (!url) {
    console.error(
      `Asset '${asset}' not found or environment variable not set. Available assets: ${Object.keys(
        assetPaths
      ).join(", ")}`
    );
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Asset '${asset}' not found or environment variable not set. Available assets: ${Object.keys(
          assetPaths
        ).join(", ")}`,
      }),
    };
  }

  console.log(`Redirecting to asset: ${url} for asset: ${asset}`);
  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
    body: "",
  };
}
