function assetHandler(event) {
  const assetPaths = {
    levelIcon: process.env.VITE_CLOUDINARY_LEVEL_ICON,
    magicLevelIcon: process.env.VITE_CLOUDINARY_MAGIC_LEVEL_ICON,
    hitPointIcon: process.env.VITE_CLOUDINARY_HIT_POINT_ICON,
    manaPointIcon: process.env.VITE_CLOUDINARY_MANA_POINT_ICON,
    swordFightingIcon: process.env.VITE_CLOUDINARY_SWORD_FIGHTING_ICON,
    axeFightingIcon: process.env.VITE_CLOUDINARY_AXE_FIGHTING_ICON,
    clubFightingIcon: process.env.VITE_CLOUDINARY_CLUB_FIGHTING_ICON,
    distanceFightingIcon: process.env.VITE_CLOUDINARY_DISTANCE_FIGHTING_ICON,
    fistFightingIcon: process.env.VITE_CLOUDINARY_FIST_FIGHTING_ICON,
    shieldingIcon: process.env.VITE_CLOUDINARY_SHIELDING_ICON,
    background: process.env.VITE_CLOUDINARY_BACKGROUND,
    title: process.env.VITE_CLOUDINARY_TITLE,
    smokeEffect: process.env.VITE_CLOUDINARY_SMOKE_EFFECT,
  };

  const { asset } = event.queryStringParameters;
  const url = assetPaths[asset];

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Asset '${asset}' not found or environment variable not set`,
      }),
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
    body: "",
  };
}

// IMPORTANT:
// - For client-side (React) code, use import.meta.env.VITE_CLOUDINARY_*
// - For serverless functions (like this), use process.env.VITE_CLOUDINARY_*
// - Set all VITE_CLOUDINARY_* variables in Netlify dashboard for production

export { assetHandler };
