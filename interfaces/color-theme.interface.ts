export interface ColorTheme {
  readonly light: string;
  readonly dark: string;
}

export interface ThemeProps {
  readonly text: ColorTheme;
  readonly background: ColorTheme;
  readonly tint?: ColorTheme;
  readonly tabIconDefault?: ColorTheme;
  readonly tabIconSelected?: ColorTheme;
}
