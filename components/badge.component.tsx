import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Color} from '../enums/color.enum';

const colorsMap = {
  [Color.Black]: Color.White,
  [Color.CyanLight]: Color.Cyan,
  [Color.GrayLight]: Color.Gray,
};

export function Badge({text, color}: {text: string; color: Color}) {
  const textColor = colorsMap[color] || Color.White;

  return (
    <View style={{...styles.badge, backgroundColor: color}}>
      <Text style={{...styles.text, color: textColor}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
});
