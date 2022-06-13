import React from 'react';
import {View} from './text-and-view.component';

export interface MarginParams {
  margin: number;
  horizontal?: boolean;
}

export function Margin({margin, horizontal}: MarginParams) {
  return <View style={horizontal ? {width: margin} : {height: margin}}></View>;
}
