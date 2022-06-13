import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Feed} from '../components/feed.component';
import {Margin} from '../components/margin.component';
import {Text, View} from '../components/text-and-view.component';
import {defaultStyles} from '../constants/default-styles.const';
import {Color} from '../enums/color.enum';
import {ItemCategory} from '../enums/item-category.enum';
import {FeedProps, FeedsData} from '../interfaces/feed-props.interface';
import {MiniCardsData} from '../interfaces/mini-card-props.interface';
import {
  CategoryRouteParams,
  LibraryStackParamList,
  LibraryStackScreenProps,
  RootStackParamList,
  RootTabScreenProps,
} from '../types';

export default function LibraryMainScreen({navigation}: LibraryStackScreenProps<'LibraryMain'>) {
  const data: FeedsData<CategoryRouteParams> = [
    {
      title: ItemCategory.Books,
      cards: [
        {
          title: 'Macbook pro 16',
          subtitle: '15 june',
          id: '1',
        },
        {
          title: 'Macbook air 13',
          subtitle: '17 june',
          id: '2',
        },
        {
          title: 'Macbook air 13',
          subtitle: '17 june',
          id: '6',
        },
      ],
      showAllButtonLink: {
        screen: 'Category',
        params: {
          categoryName: ItemCategory.Books,
        },
      },
    },
    {
      title: ItemCategory.Notebooks,
      cards: [
        {
          title: 'Macbook pro 16',
          subtitle: '15 june',
          id: '3',
        },
        {
          title: 'Macbook air 13',
          subtitle: '17 june',
          id: '4',
        },
      ],
      showAllButtonLink: {
        screen: 'Category',
        params: {
          categoryName: ItemCategory.Notebooks,
        },
      },
    },
    {
      title: ItemCategory.Boardgames,
      cards: [
        {
          title: 'Macbook pro 16',
          subtitle: '15 june',
          id: '5',
        },
      ],
      showAllButtonLink: {
        screen: 'Category',
        params: {
          categoryName: ItemCategory.Boardgames,
        },
      },
    },
    {
      title: ItemCategory.Others,
      cards: [
        {
          title: 'Macbook pro 16',
          subtitle: '15 june',
          id: '6',
        },
      ],
      showAllButtonLink: {
        screen: 'Category',
        params: {
          categoryName: ItemCategory.Others,
        },
      },
    },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <Feed
          title={item.title}
          data={item.cards}
          scrollViewStyle={defaultStyles.feedScroll}
          containerViewStyle={defaultStyles.feedContainer}
          horizontal={true}
          feedStyle={defaultStyles.feed}
          gap={16}
          onShowAllButtonPress={() => {
            navigation.navigate('Category', item.showAllButtonLink.params);
          }}
        ></Feed>
      )}
      style={defaultStyles.screenContainer}
      ItemSeparatorComponent={() => <Margin margin={16} horizontal={true}></Margin>}
      keyExtractor={item => item.title}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
}

const styles = StyleSheet.create({});
