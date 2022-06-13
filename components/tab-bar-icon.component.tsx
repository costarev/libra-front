import {FontAwesome} from '@expo/vector-icons';
import React from 'react';
import {Color} from '../enums/color.enum';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: Color;
}) {
  return <FontAwesome size={24} {...props} />;
}
