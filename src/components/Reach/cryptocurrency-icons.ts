import manifest from "cryptocurrency-icons/manifest.json";

/* Turns `CryptoIcons` manifest list into a key-value map for maximum lookups */
export interface CryptoIconData {
  color: string;
  name: string;
  symbol: string;
}

/** Full key-value map of crypto symbols and image asset paths */
export const IconsMap: Map<string, CryptoIconData> = (
  manifest as CryptoIconData[]
).reduce((iconsMap, crypto) => iconsMap.set(crypto.symbol, crypto), new Map());

/* Manually add "Conflux", which is not in manifest list */
IconsMap.set("CFX", { name: "Conflux", symbol: "CFX", color: "#000" });

/**
 * Loads an icon for a cryptocurrency. Fall back to "generic.png" for missing imgs
 */
export function cryptoImage(symbol: string, color = false): string {
  let img;

  try {
    img = imgSrc(symbol.toLowerCase(), color);
  } catch (error) {
    img = imgSrc("generic", color);
  }

  return img;
}

// Img context: required for importing the icons as data urls
const imgContext = require.context(
  "../../../node_modules/cryptocurrency-icons/svg/color",
  true
);
const bwImgContext = require.context(
  "../../../node_modules/cryptocurrency-icons/svg/black",
  true
);
function imgSrc(s: string, color?: boolean) {
  const path = `./${s.toLowerCase()}.svg`;
  return (color ? imgContext(path) : bwImgContext(path)).default;
}
