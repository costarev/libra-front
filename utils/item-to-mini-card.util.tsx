import {ItemDto} from '../dtos/item.interface';
import {MiniCard} from '../components/mini-card.component';
import React from 'react';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViewStyle} from 'react-native';

export function itemToMiniCard(
  item: ItemDto,
  navigation: NativeStackNavigationProp<ParamListBase, string>,
  params?: {underlay?: boolean; adaptiveSize?: boolean; style?: ViewStyle}
) {
  return (
    <MiniCard
      id={item.itemId.toString()}
      key={item.itemId}
      title={item.title}
      subtitle={item.itemStatus}
      onPressFn={() => {
        navigation.navigate('Product', {id: item.itemId});
      }}
      {...params}
    ></MiniCard>
  );
}
