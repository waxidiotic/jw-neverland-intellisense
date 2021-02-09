import axios from "axios";
import { parse as parseYaml } from "yaml";

const COLOR_REPOS = {
  system:
    "https://raw.githubusercontent.com/jwplayer/jw-design-library/master/dictionary/properties/color/system.yaml",
  brand:
    "https://raw.githubusercontent.com/jwplayer/jw-design-library/master/dictionary/properties/color/brand.yaml",
};

interface Color {
  value: string;
}

type ColorEntry = Record<string, Color>;

type ColorCategoryName = keyof typeof COLOR_REPOS;

type ColorCategory = Record<ColorCategoryName, ColorEntry>;

type ColorsCollection = {
  [key in ColorCategoryName]?: ColorCategory;
};

export async function getColorsFromRepo(): Promise<ColorsCollection> {
  const colors: ColorsCollection = {};
  const categories = Object.keys(COLOR_REPOS);
  for (const category of categories) {
    const response = (
      await axios.get(COLOR_REPOS[category as ColorCategoryName])
    ).data;
    colors[category as ColorCategoryName] = parseYaml(response).color[category];
  }

  return colors;
}
