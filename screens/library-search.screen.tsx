import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Badge} from '../components/badge.component';
import {ButtonTheme, SimpleButton} from '../components/button.component';
import {Feed} from '../components/feed.component';
import {Margin} from '../components/margin.component';
import {Text, View} from '../components/text-and-view.component';
import {defaultStyles} from '../constants/default-styles.const';
import {SearchContext} from '../contexts/search.context';
import {Color} from '../enums/color.enum';
import {ItemCategory} from '../enums/item-category.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';
import {FeedProps, FeedsData} from '../interfaces/feed-props.interface';
import {MiniCardsData} from '../interfaces/mini-card-props.interface';
import {LibraryStackParamList, LibraryStackScreenProps, RootTabScreenProps} from '../types';
import {itemToMiniCard} from '../utils/item-to-mini-card.util';

export default function LibrarySearchScreen({
  navigation,
}: LibraryStackScreenProps<'LibrarySearch'>) {
  const frequently: ReadonlyArray<string> = [
    'macbook',
    'java',
    'lenovo',
    'мафия',
    'samsung монитор',
  ];
  const categories: ReadonlyArray<ItemCategory> = Object.values(ItemCategory);

  const frequentlyBadges = frequently.map((text, index) => (
    <Badge style={styles.frequentlyBadge} text={text} key={index}></Badge>
  ));

  const categoriesBadges = categories.map((category, index) => (
    <TouchableHighlight
      underlayColor={Color.Black05}
      style={styles.category}
      onPress={() => {
        navigation.navigate('Category', {categoryName: category});
      }}
      key={index}
    >
      <Text style={defaultStyles.textM}>{category}</Text>
    </TouchableHighlight>
  ));

  const searchContext = React.useContext(SearchContext);

  return (
    <View style={defaultStyles.screenContainer}>
      {searchContext.isSearch ? (
        <ActivityIndicator size='large'></ActivityIndicator>
      ) : searchContext.results ? (
        <FlatList
          data={searchContext.results}
          renderItem={({item}) =>
            itemToMiniCard(item, navigation, {adaptiveSize: true, style: styles.resultCard})
          }
          numColumns={2}
          columnWrapperStyle={styles.resultsColumn}
          contentContainerStyle={styles.resultsContainer}
          keyExtractor={item => item.itemId.toString()}
          ItemSeparatorComponent={() => <Margin margin={16}></Margin>}
          ListFooterComponent={() => (
            <View style={searchContext.results.length ? styles.footerContainer : {}}>
              <Text style={{...defaultStyles.headerM, ...styles.footerTitle}}>
                Не нашли, что искали?
              </Text>
              <Text lightColor={Color.Gray} darkColor={Color.Gray} style={defaultStyles.textS}>
                Попробуйте запросить это у администратора или поискать в другом офисе!
              </Text>
              <View style={styles.footerButtons}>
                <SimpleButton
                  text='Запросить'
                  theme={ButtonTheme.Secondary}
                  lightText={true}
                  onPressFn={() => {}}
                ></SimpleButton>
                <Margin margin={16}></Margin>
                <SimpleButton
                  text='Сменить офис'
                  theme={ButtonTheme.Secondary}
                  lightText={true}
                  onPressFn={() => {}}
                ></SimpleButton>
              </View>
            </View>
          )}
        ></FlatList>
      ) : (
        <View>
          <View>
            <Text style={defaultStyles.headerM}>Часто ищут</Text>
            <View style={styles.frequentlyList}>{frequentlyBadges}</View>
          </View>
          <View style={styles.categoriesContainer}>
            <Text style={defaultStyles.headerM}>Категории</Text>
            <View style={styles.categoriesList}>{categoriesBadges}</View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frequentlyList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
  },
  frequentlyBadge: {
    marginBottom: 12,
    marginRight: 12,
  },
  categoriesContainer: {
    marginTop: 28,
  },
  categoriesList: {
    marginTop: 20,
  },
  category: {
    height: 48,
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  resultsContainer: {
    minHeight: '100%',
  },
  resultsColumn: {
    justifyContent: 'space-between',
  },
  resultCard: {
    flex: 0.48,
    aspectRatio: 4 / 3,
  },
  footerContainer: {
    marginTop: 28,
  },
  footerTitle: {
    marginBottom: 20,
  },
  footerButtons: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
  },
});
