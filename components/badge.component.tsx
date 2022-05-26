import React from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';

interface BadgeParams {
  readonly text: string;
  readonly color?: Color;
  readonly style?: ViewStyle;
}

const colorsMap = {
  [Color.Black]: Color.White,
  [Color.GrayDark]: Color.White,
  [Color.CyanLight]: Color.Cyan,
  [Color.GrayLight]: Color.Gray,
};

export function Badge({text, color, style}: BadgeParams) {
  const backgroundColor = useThemeColor(
    {light: color || Color.CyanLight, dark: Color.GrayDark},
    'background'
  );
  const textColor = colorsMap[backgroundColor] || Color.White;

  return (
    <View style={{...styles.badge, backgroundColor, ...style}}>
      <Text style={{...styles.text, color: textColor}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
});
