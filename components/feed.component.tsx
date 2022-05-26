import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {defaultStyles} from '../constants/default-styles.const';
import {MiniCardsData} from '../interfaces/mini-card-props.interface';
import {ButtonTheme, SimpleButton} from './button.component';
import {Margin} from './margin.component';
import {MiniCard} from './mini-card.component';
import {Text} from './text-and-view.component';

interface FeedParams {
  readonly title: string;
  readonly data: MiniCardsData;
  readonly gap?: number;
  readonly cardUnderlay?: boolean;
  readonly feedStyle?: ViewStyle;
  readonly scrollViewStyle?: ViewStyle;
  readonly containerViewStyle?: ViewStyle;
  readonly cardStyle?: ViewStyle;
  readonly horizontal?: boolean;
  readonly onShowAllButtonPress?: () => void;
}

export function Feed({
  title,
  data,
  gap,
  cardUnderlay,
  scrollViewStyle,
  containerViewStyle,
  horizontal,
  cardStyle,
  feedStyle,
  onShowAllButtonPress,
}: FeedParams) {
  return (
    <View style={feedStyle}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <SimpleButton
          text='Смотреть все'
          theme={ButtonTheme.Clear}
          onPressFn={onShowAllButtonPress}
          lightText={true}
          style={styles.showAllButton}
        ></SimpleButton>
      </View>
      <FlatList
        data={data}
        horizontal={horizontal}
        renderItem={({item}) => (
          <MiniCard
            id={item.id}
            underlay={cardUnderlay}
            title={item.title}
            subtitle={item.subtitle}
            style={cardStyle}
            onPressFn={item.onPressFn}
          ></MiniCard>
        )}
        style={scrollViewStyle}
        contentContainerStyle={containerViewStyle}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() =>
          gap ? <Margin margin={gap} horizontal={horizontal}></Margin> : <></>
        }
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...defaultStyles.headerM,
    flex: 1,
  },
  showAllButton: {
    flex: 0,
  },
});
