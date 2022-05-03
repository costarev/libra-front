/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {ColorTheme} from './../interfaces/color-theme.interface';
import Colors from '../constants/color-theme.const';
import useColorScheme from './use-color-scheme.hook';

export function useThemeColor(
  props: ColorTheme,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
