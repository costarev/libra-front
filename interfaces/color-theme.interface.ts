import {Color} from './../enums/color.enum';

export interface ColorThemeMap {
  readonly light: Color;
  readonly dark: Color;
}

export interface ThemeProps {
  readonly text: ColorThemeMap;
  readonly background: ColorThemeMap;
  readonly primary?: ColorThemeMap;
  readonly tabIconDefault?: ColorThemeMap;
  readonly tabIconSelected?: ColorThemeMap;
}
