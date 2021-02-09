import axios from "axios";
import { parse } from "yaml";

const COLOR_REPOS = {
  system:
    "https://raw.githubusercontent.com/jwplayer/jw-design-library/master/dictionary/properties/color/system.yaml",
  brand:
    "https://raw.githubusercontent.com/jwplayer/jw-design-library/master/dictionary/properties/color/brand.yaml",
};
interface Color {
  value: string;
}

type ColorCategory = {
  [key in keyof typeof COLOR_REPOS]: Color;
};
interface ColorsCollection {
  system?: ColorCategory;
  brand?: ColorCategory;
}
export async function getColorsFromRepo(): Promise<ColorsCollection> {
  const colors: ColorsCollection = {};
  colors.system = parse((await axios.get(COLOR_REPOS.system)).data);
  colors.brand = parse((await axios.get(COLOR_REPOS.brand)).data);
  return colors;
}
