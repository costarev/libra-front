import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import {Color} from '../enums/color.enum';
import {MiniCardProps} from '../interfaces/mini-card-props.interface';

export interface MiniCardParams extends MiniCardProps {
  underlay?: boolean;
  adaptiveSize?: boolean;
  style?: ViewStyle;
}

export function MiniCard({
  title,
  underlay,
  subtitle,
  image,
  style,
  adaptiveSize,
  onPressFn,
}: MiniCardParams) {
  return (
    <TouchableWithoutFeedback onPress={onPressFn}>
      <LinearGradient
        colors={[Color.Transparent, Color.Black50]}
        style={{
          ...style,
          ...styles.container,
          ...(adaptiveSize ? {} : styles.fixSize),
        }}
      >
        <View
          style={{...styles.textContainer, ...(underlay ? styles.textContanierBackground : {})}}
        >
          {subtitle ? (
            <Text numberOfLines={1} style={{...styles.subtitle}}>
              {subtitle}
            </Text>
          ) : (
            <></>
          )}
          <Text numberOfLines={2} style={{...styles.title}}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.GrayLight,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },
  fixSize: {
    width: 188,
    height: 140,
  },
  title: {
    color: Color.White,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
  },
  subtitle: {
    color: Color.White,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 4,
  },
  textContainer: {
    padding: 12,
  },
  textContanierBackground: {
    backgroundColor: Color.White,
  },
});
