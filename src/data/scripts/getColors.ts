import axios from "axios";

const SYSTEM_COLORS_URL =
  "https://raw.githubusercontent.com/jwplayer/jw-design-library/master/dictionary/properties/color/system.yaml";

export async function getColorsFromRepo(): Promise<any> {
  const response = await axios.get(SYSTEM_COLORS_URL);
  return response.data;
}
