import {Color} from './../enums/color.enum';
import {colorTheme} from './../constants/color-theme.const';
/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {ColorThemeMap} from './../interfaces/color-theme.interface';
import useColorScheme from './use-color-scheme.hook';

export function useThemeColor(
  themeMap: ColorThemeMap,
  colorName: keyof typeof colorTheme.light.colors
): Color {
  const theme = useColorScheme();
  const colorFromProps = themeMap[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colorTheme[theme].colors[colorName] as Color;
  }
}
